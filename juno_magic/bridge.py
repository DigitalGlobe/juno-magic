from twisted.internet.error import ReactorAlreadyInstalledError
from zmq.eventloop import ioloop
ioloop.install()
from tornado.ioloop import IOLoop
import tornado.platform.twisted
try:
    tornado.platform.twisted.install()
except ReactorAlreadyInstalledError:
    pass

from jupyter_client.blocking.client import BlockingKernelClient
from ipykernel.jsonutil import json_clean

from twisted.python import log
from twisted.internet.defer import inlineCallbacks, returnValue, CancelledError
from twisted.internet.task import LoopingCall
from twisted.internet.error import ConnectionRefusedError
from autobahn.twisted.util import sleep
from autobahn.twisted.wamp import ApplicationSession, Service
from autobahn import wamp
from autobahn.wamp.exception import ApplicationError

from txzmq import ZmqEndpoint, ZmqFactory, ZmqSubConnection

import json
import sys
import argparse
from pprint import pformat
try:
    from queue import Empty  # Python 3
except ImportError:
    from Queue import Empty  # Python 2

if sys.version.startswith("3"):
    unicode = str

from .runner import JunoRunner

_zmq_factory = ZmqFactory()

class ZmqProxyConnection(ZmqSubConnection):
    def __init__(self, endpoint, wamp_session, prefix):
        self._endpoint = endpoint
        self._wamp = wamp_session
        self._prefix = prefix
        ZmqSubConnection.__init__(self, _zmq_factory, ZmqEndpoint('connect', endpoint.encode("utf-8")))
        self.subscribe(b"")

    def gotMessage(self, message, header=""):
        # log.msg("[MachineConnection] {} {}".format(header, message))
        self._wamp.publish(self._prefix, [str(header), json.loads(message.decode("utf-8"))])


def build_bridge_class(client):
    _key = client.session.key.decode("utf-8")
    class JupyterClientWampBridge(ApplicationSession):
        iopub_deferred = None
        prefix_list = set()
        machine_connection = None
        @wamp.register(u"io.timbr.kernel.{}.execute".format(_key))
        @inlineCallbacks
        def execute(self, *args, **kwargs):
            result = yield client.execute(*args, **kwargs)
            returnValue(result)

        @wamp.register(u"io.timbr.kernel.{}.complete".format(_key))
        @inlineCallbacks
        def complete(self, *args, **kwargs):
            result = yield client.complete(*args, **kwargs)
            returnValue(result)

        @wamp.register(u"io.timbr.kernel.{}.inspect".format(_key))
        @inlineCallbacks
        def inspect(self, *args, **kwargs):
            result = yield client.inspect(*args, **kwargs)
            returnValue(result)

        @wamp.register(u"io.timbr.kernel.{}.history".format(_key))
        @inlineCallbacks
        def history(self, *args, **kwargs):
            result = yield client.history(*args, **kwargs)
            returnValue(result)

        @wamp.register(u"io.timbr.kernel.{}.is_complete".format(_key))
        @inlineCallbacks
        def is_complete(self, *args, **kwargs):
            result = yield client.is_complete(*args, **kwargs)
            returnValue(result)

        @wamp.register(u"io.timbr.kernel.{}.shutdown".format(_key))
        @inlineCallbacks
        def shutdown(self, *args, **kwargs):
            result = yield client.shutdown(*args, **kwargs)
            returnValue(result)

        @wamp.register(u"io.timbr.kernel.{}.list".format(_key))
        def list(self):
            return list(self.prefix_list)

        @inlineCallbacks
        def proxy_iopub_channel(self):
            while True:
                try:
                    msg = client.get_iopub_msg(block=False)
                    if(not msg["content"].get("metadata", {}).get("echo", False)):
                        log.msg("[iopub] {}".format(pformat(json_clean(msg))))
                        yield self.publish(u"io.timbr.kernel.{}.iopub".format(_key), json_clean(msg))
                except ValueError as ve:
                    # This happens when an "invalid signature" is encountered which for us probably
                    # means that the message did not originate from this kernel
                    log.msg("ValueError")
                except Empty:
                    yield sleep(0.1)

        def proxy_machine_channel(self):
            """
            If there is a timbr-machine zeromq pub channel present for this kernel_id it will be
            proxied over the WAMP connection at io.timbr.kernel.<kernel_id>.machine
            """
            ipc_endpoint = "ipc:///tmp/timbr-machine/{}".format(_key) # NOTE: Breaks Windows compatibility
            prefix = "io.timbr.kernel.{}.machine".format(_key)
            self.machine_connection = ZmqProxyConnection(ipc_endpoint, self, prefix)

        @wamp.register(u"io.timbr.kernel.{}.ping".format(_key))
        def ping(self):
            return client.is_alive()

        @inlineCallbacks
        def is_active(self, prefix):
            try:
                response = yield self.call(u"{}.ping".format(prefix))
                # log.msg("Ping response {}".format(response))
                returnValue(response)
            except ApplicationError:
                returnValue(False)

        def on_discovery(self, prefix):
            self.prefix_list.add(prefix)

        @inlineCallbacks
        def update_discovery(self):
            my_prefix = u"io.timbr.kernel.{}".format(_key)
            yield self.publish(u"io.timbr.kernel.discovery", my_prefix)
            prefix_list = list(self.prefix_list)
            active_prefix_list = []
            for prefix in prefix_list:
                # log.msg("Checking prefix {}".format(prefix))
                # NOTE: Don't think this works and may be sensitive to timeout
                is_active = yield self.is_active(prefix)
                # log.msg("is_active set to {}".format(is_active))
                if is_active is True:
                    active_prefix_list.append(prefix)
            self.prefix_list = set(active_prefix_list)
            try:
                yield self.register(self.list, u"io.timbr.kernel.list")
            except ApplicationError:
                pass
            # log.msg("Prefix list is now {}".format(str(self.prefix_list)))

            returnValue(self.prefix_list)

        @inlineCallbacks
        def onJoin(self, details):
            log.msg("[onJoin] Registering WAMP methods...")
            yield self.register(self)
            log.msg("[onJoin] ...done.")
            log.msg("[onJoin] Updating kernel discovery mechanism")
            yield self.subscribe(self.on_discovery, u"io.timbr.kernel.discovery")
            self.discovery_task = LoopingCall(self.update_discovery)
            self.discovery_task.start(3) # loop every 3 seconds
            log.msg("[onJoin] Establishing Pub/Sub Channels...")
            try:
                self.iopub_deferred.cancel()
            except (CancelledError, AttributeError):
                pass
            finally:
                self.iopub_deferred = self.proxy_iopub_channel()
            try:
                self.machine_connection.shutdown()
            except AttributeError:
                pass
            finally:
                self.proxy_machine_channel()

            log.msg("[onJoin] ...done.")
            log.msg(client.hb_channel._running)

        @inlineCallbacks
        def onLeave(self, details):
            try:
                yield self.machine_connection.shutdown()
            except AttributeError:
                pass
            yield self.discovery_task.stop()
            super(self.__class__, self).onLeave(details)

        def onDisconnect(self):
            log.msg("[onDisconnect] ...")
            log.msg("Attempting to reconnect ...")

    return JupyterClientWampBridge



def main():
    global _bridge_runner
    log.startLogging(sys.stderr)

    parser = argparse.ArgumentParser()
    parser.add_argument("--debug", action="store_true", help="Enable debug output.")
    # NOTE: all of these are placeholders
    parser.add_argument("--wamp-realm", default=u"jupyter", help='Router realm')
    parser.add_argument("--wamp-url", default=u"ws://127.0.0.1:8123", help="WAMP Websocket URL")
    parser.add_argument("--token", type=unicode, help="OAuth token to connect to router")
    parser.add_argument("file", help="Connection file")
    args = parser.parse_args()

    with open(args.file) as f:
        config = json.load(f)

    client = BlockingKernelClient(connection_file=args.file)
    client.load_connection_file()
    client.start_channels()

    _bridge_runner = JunoRunner(url=unicode(args.wamp_url), realm=unicode(args.wamp_realm),
                                headers={"Authorization": "Bearer {}".format(args.token),
                                         "X-Kernel-ID": client.session.key})

    log.msg("Connecting to router: %s" % args.wamp_url)
    log.msg("  Project Realm: %s" % (args.wamp_realm))

    @inlineCallbacks
    def reconnector():
        while True:
            try:
                log.msg("Attempting to connect...")
                wampconnection = yield _bridge_runner.run(build_bridge_class(client), start_reactor=False)
                log.msg(wampconnection)
                yield sleep(10.0) # Give the connection time to set _session
                while wampconnection.isOpen():
                    yield sleep(5.0)
            except ConnectionRefusedError as ce:
                log.msg("ConnectionRefusedError: Trying to reconnect... ")
                yield sleep(1.0)

    reconnector()
    # start the tornado io loop
    IOLoop.current().start()

if __name__ == "__main__":
    main()
