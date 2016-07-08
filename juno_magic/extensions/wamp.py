from IPython.core.magic import (Magics, magics_class, line_magic,
                                cell_magic, line_cell_magic)
from IPython import get_ipython
from IPython.display import publish_display_data, display, Javascript
from IPython.core.formatters import DisplayFormatter

from pprint import pprint

import argparse
import os
import sys
import shlex
import json
from time import sleep

if sys.version.startswith("3"):
    unicode = str

from twisted.internet.error import ReactorAlreadyInstalledError
from zmq.eventloop import ioloop
ioloop.install()
from tornado.ioloop import IOLoop
import tornado.platform.twisted
try:
    tornado.platform.twisted.install()
except ReactorAlreadyInstalledError:
    pass

from twisted.python import log
from twisted.internet import reactor, threads
from twisted.internet.defer import inlineCallbacks, returnValue, Deferred, CancelledError
from autobahn.twisted.wamp import ApplicationSession
from autobahn import wamp
from autobahn.wamp.exception import ApplicationError
from autobahn.websocket.util import parse_url
from autobahn.twisted.util import sleep as absleep

from juno_magic.runner import JunoRunner

from collections import deque

from sh import wampify

import requests
import re


JUNO_KERNEL_URI = "https://juno.timbr.io/api/kernels/list"


def publish_to_display(obj):
    output, _ = DisplayFormatter().format(obj)
    publish_display_data(output)

def build_display_data(obj):
    output = {"text/plain": repr(obj)}
    methods = dir(obj)
    if "_repr_html_" in methods:
        output["text/html"] = obj._repr_html_()
    if "_repr_javascript_" in methods:
        output["application/javascript"] = obj._repr_javascript_()
    return output


def build_bridge_class(magics_instance):
    class WampConnectionComponent(ApplicationSession):
        _wamp_prefix = ""
        _ipython = get_ipython()
        _msg_id_lut = deque(maxlen=10)
        _machine_callbacks = []
        _iopub_sub = None
        _machine_sub = None

        @inlineCallbacks
        def reset_prefix(self):
            if self._iopub_sub:
                yield self._iopub_sub.unsubscribe()
                self._iopub_sub = None
            if self._machine_sub:
                yield self._machine_sub.unsubscribe()
                self._machine_sub = None
            returnValue(None)

        @inlineCallbacks
        def set_prefix(self, prefix):
            yield self.reset_prefix()
            self._wamp_prefix = unicode(prefix)
            self._iopub_sub = yield self.subscribe(self.on_iopub, u".".join([self._wamp_prefix, u"iopub"]))
            # try:
            #     yield self.subscribe(self.on_machine, u".".join([self._wamp_prefix, u"machine"]))
            # except:
            #     # whatever
            #     pass

        def on_iopub(self, msg):
            if msg["msg_type"] == "error":
                publish_display_data({"text/plain": "{} - {}\n{}".format(msg["content"]["ename"],
                                                                         msg["content"]["evalue"],
                                                                         "\n".join(msg["content"]["traceback"]))},
                                     metadata={"echo": True})
            elif msg["msg_type"] == "stream":
                publish_display_data({"text/plain": msg["content"]["text"]}, metadata={"echo": True})
            elif msg["msg_type"] == "display_data":
                publish_display_data(msg["content"]["data"], metadata={"echo": True})
            elif msg["msg_type"] == "execute_result":
                publish_display_data(msg["content"]["data"], metadata={"echo": True})
            elif msg["msg_type"] == "status":
                display(Javascript('$("#juno_status").trigger("update", ["{}"])'.format(msg["content"]["execution_state"])))
            elif msg["msg_type"] in ["execute_input", "execution_state"]:
                pass
            else:
                pprint(msg)


        def on_machine(self, msg):
            # print("[on_machine] {}".format(msg))
            # print("[on_machine] {}".format(self._machine_callbacks))
            bad_callbacks = []
            for cb in self._machine_callbacks:
                try:
                    callback = self._ipython.user_ns[cb]
                    # print(callback)
                except (IndexError, KeyError) as ie:
                    bad_callbacks.append(cb)
                try:
                    callback(msg)
                except Exception as e:
                    log.msg("Exception in callback '{}'".format(cb))
                    log.msg(str(e))
            for cb in bad_callbacks:
                self._machine_callbacks.remove(cb)

        def add_machine_callback(self, cb_str):
            if cb_str not in self._machine_callbacks:
                self._machine_callbacks.append(cb_str)

        @inlineCallbacks
        def execute(self, *args, **kwargs):
            result = yield self.call(".".join([self._wamp_prefix, u"execute"]), *args, **kwargs)
            # result is the remote execute_request msg_id,
            returnValue(result)

        @inlineCallbacks
        def onJoin(self, details):
            log.msg("[onJoin] Registering RPC methods...")
            yield self.register(self)
            log.msg("[onJoin] ...done.")
            log.msg("[onJoin] Checking in with Magics class")
            magics_instance.set_connection(self)
            log.msg("[onJoin] ...done.")
            print("Successfully connected to {}".format(magics_instance._router_url))
            if magics_instance._kernel_prefix:
                print("Attempting to reconnect to {}".format(magics_instance._kernel_prefix))
                yield self.set_prefix(magics_instance._kernel_prefix)
                print("Reconnected to kernel prefix {}".format(magics_instance._kernel_prefix))
            returnValue(None)

        def onLeave(self, details):
            log.msg("[WampConnectionComponent] onLeave()")
            log.msg("details: {}".format(str(details)))
            super(self.__class__, self).onLeave(details)

        @inlineCallbacks
        def onDisconnect(self):
            # onDisconnect we should just set the connection to None so that we know to reconnect
            # next time connect is called
            magics_instance.set_connection(None)

    return WampConnectionComponent


@magics_class
class JunoMagics(Magics):
    def __init__(self, shell):
        super(JunoMagics, self).__init__(shell)
        self._router_url = os.environ.get("JUPYTER_WAMP_ROUTER", "wss://juno.timbr.io/wamp/route")
        self._realm = os.environ.get("JUPYTER_WAMP_REALM", "jupyter")
        self._wamp = None
        self._wamp_runner = None
        self._kernel_prefix = None
        # NOTE: this strategy only seems to work in kernels launched by the notebook server
        self._connection_file = get_ipython().config["IPKernelApp"]["connection_file"]
        self._token = os.environ.get("JUNO_AUTH_TOKEN")
        self._sp = None
        self._connected = None

        # set local kernel key
        with open(self._connection_file) as f:
            config = json.load(f)
            self._kernel_key = config["key"]

        self._parser = self.generate_parser()

    def set_connection(self, wamp_connection):
        log.msg("[set_connection] Connection component set.")
        self._wamp = wamp_connection
        if wamp_connection is not None:
            self._connected.callback(wamp_connection)

    def generate_parser(self):
        parser = argparse.ArgumentParser(prog="juno")

        subparsers = parser.add_subparsers()
        token_parser = subparsers.add_parser("token", help="Set an OAuth token for WAMP router access")
        token_parser.add_argument("token", help="OAuth token for WAMP router access", nargs="?")
        token_parser.set_defaults(fn=self.token)
        connect_parser = subparsers.add_parser("connect", help="[Re]-connect to the WAMP router")
        connect_parser.add_argument("wamp_url", help="WAMP router url to join", default=self._router_url, nargs="?")
        connect_parser.add_argument("--reconnect", help="Force reconnection even if we don't need to.", action="store_true")
        connect_parser.set_defaults(fn=self.connect)
        list_parser = subparsers.add_parser("list", help="List registered kernel prefixes")
        list_parser.add_argument("--details", help="Display detailed information about existing kernels", action="store_true")
        list_parser.add_argument("--raw", help="Display raw kernel and prefix information about existing kernels", action="store_true")
        list_parser.set_defaults(fn=self.list)
        select_parser = subparsers.add_parser("select", help="Select a remote kernel to make active")
        select_parser.add_argument("kernel", help="Kernel name or prefix id for accessing the remote kernel", nargs="?")
        select_parser.set_defaults(fn=self.select)
        start_bridge_parser = subparsers.add_parser("start_bridge", help="Expose this kernel over WAMP for remote access")
        start_bridge_parser.add_argument("wamp_url", help="WAMP router url to expose over", default=self._router_url, nargs="?")
        start_bridge_parser.add_argument("--wamp-realm", help="WAMP realm", default="jupyter")
        start_bridge_parser.add_argument("--token", help="Authentication token", default=self._token, nargs="?")
        start_bridge_parser.set_defaults(fn=self.start_bridge)
        stop_bridge_parser = subparsers.add_parser("stop_bridge", help="Stop exposing this kernel over WAMP")
        stop_bridge_parser.set_defaults(fn=self.stop_bridge)
        subscribe_parser = subparsers.add_parser("subscribe", help="Register a callback callable in the user namespace that gets called in response to timbr-machine messages")
        subscribe_parser.add_argument("callback", help="Name of the callback function")
        subscribe_parser.set_defaults(fn=self.subscribe)
        execute_parser = subparsers.add_parser("execute", help="Evaluate code on remote kernel")
        execute_parser.add_argument("prefix", help="Prefix for accessing the remote kernel", nargs="?")
        execute_parser.set_defaults(fn=self.execute)
        return parser

    @line_cell_magic
    def juno(self, line, cell=None):
        try:
            input_args = shlex.split(line)
            if cell is not None:
                input_args.insert(0, "execute")
            args, extra = self._parser.parse_known_args(input_args)
            output = args.fn(cell=cell, **vars(args))
            if isinstance(output, Deferred):
                output.addCallback(lambda x: publish_to_display(x) if x is not None else "[muted]")
            else:
                return output
        except SystemExit:
            pass

    def token(self, token, **kwargs):
        self._token = token

    def connect(self, wamp_url, reconnect=False, **kwargs):
        # NOTE: we would like connect to return immediately if there is an active connection, disconnect and
        # connect if the connection url has changed, or reconnect if the connection has dropped
        if (wamp_url != self._router_url) or reconnect:
            # NOTE: this means that connect was called with either a new url or we are forcibly reconnecting
            try:
                self._wamp_runner.cancel()
                self.set_connection(None)
            except (CancelledError, AttributeError):
                # NOTE: this means self._wamp_runner was already set to None, or already cancelled.
                pass
        if self._wamp is None:
            # NOTE: this means we have dropped the connection (ie onDisconnect has been called), so we'll make
            # a new one.
            self._connected = Deferred() # allocate a new deferred
            self._router_url = wamp_url
            _wamp_application_runner = JunoRunner(url=unicode(self._router_url), realm=unicode(self._realm), headers={"Authorization": "Bearer {}".format(self._token)})
            self._wamp_runner = _wamp_application_runner.run(build_bridge_class(self), start_reactor=False) # -> returns a deferred
            log.msg("Connecting to router: {}".format(self._router_url))
            log.msg("  Project Realm: {}".format(self._realm))
        return self._connected # either the new or the old deferred, depending on if we have reconnected or not

    def start_bridge(self, wamp_url, wamp_realm="jupyter", token=None, **kwargs):
        self.stop_bridge()
        if token is None:
            token = self._token
        self._sp = wampify(self._connection_file, "--wamp-url", wamp_url, "--token", token, _bg=True)
        sleep(1)
        if self._sp.process.is_alive():
            print("Bridge Running")
        else:
            print(self._sp.stderr)

    def stop_bridge(self, **kwargs):
        try:
            self._sp.process.terminate()
            print("WAMP bridge exposure process terminated successfully")
        except AttributeError as ae:
            pass
        self._sp = None

    @inlineCallbacks
    def list(self, raw=False, **kwargs):
        yield self.connect(self._router_url)
        try:
            output = yield self._wamp.call(u"io.timbr.kernel.list")
            try:
                output.remove(self._kernel_key)
            except ValueError:
                # kernel key doesn't exist in the list
                pass
        except ApplicationError:
            output = []
        if raw is not True:
            prefix_map = yield threads.deferToThread(self._get_kernel_names, output, details=kwargs.get('details'))
            returnValue(prefix_map)
        else:
            returnValue(output)

    @inlineCallbacks
    def select(self, kernel, **kwargs):
        yield self.connect(self._router_url)
        @inlineCallbacks
        def _select(prefix):
            yield self._wamp.reset_prefix()
            if self._kernel_prefix:
                print("Successfully unsubscribed from prefix {}".format(self._kernel_prefix))
            else:
                print("No previous subscriptions")
            self._kernel_prefix = prefix
            yield self._wamp.set_prefix(prefix)
            print("Kernel selected [{}]".format(prefix))

        prefix_list = yield self.list(raw=True)
        is_kernel_key = lambda t: re.match(r'io\.timbr\.kernel\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', t)
        if not is_kernel_key(kernel):
            prefix_map = yield threads.deferToThread(self._get_kernel_names, prefix_list, details=True)
            if kernel not in prefix_map:
                print("Kernel not in prefix map")
                returnValue(None)
            else:
                kernel = prefix_map[kernel]
        if kernel in prefix_list:
            if kernel != self._kernel_prefix:
                yield _select(kernel)
            else:
                print("Kernel already selected")
        else:
            print("Kernel not available")

    @inlineCallbacks
    def subscribe(self, callback, **kwargs):
        # NOTE: callback is a string
        yield self.connect(self._router_url)
        yield self._wamp.add_machine_callback(callback)

    @inlineCallbacks
    def execute(self, cell, prefix=None, **kwargs):
        yield self.connect(self._router_url)
        if prefix is not None:
            output = yield self._wamp.call(".".join([prefix, "execute"]), cell)
        output = yield self._wamp.call(".".join([self._kernel_prefix, "execute"]), cell)

    def _get_kernel_names(self, prefix_list, details=False):
        headers = {"Authorization": "Bearer {}".format(self._token)}
        payload = {"addresses": [prefix.split(".")[-1] for prefix in prefix_list]}
        r = requests.post(JUNO_KERNEL_URI, headers=headers, data=payload)
        if details:
            prefix_map = {str(v): ".".join(['io.timbr.kernel', str(k)]) for k, v in r.json().iteritems()}
        else:
            prefix_map = [str(v) for k, v in r.json().iteritems()]
        return prefix_map
