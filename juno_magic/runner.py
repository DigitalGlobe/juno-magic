from autobahn.twisted.wamp import ApplicationRunner
import txaio
from autobahn.wamp import protocol
from autobahn.wamp.types import ComponentConfig
from autobahn.websocket.util import parse_url
from autobahn.twisted.websocket import WampWebSocketClientFactory


class JunoRunner(ApplicationRunner):
    """
    This class is a convenience tool mainly for development and quick hosting
    of WAMP application components.
    It can host a WAMP application component in a WAMP-over-WebSocket client
    connecting to a WAMP router.
    """

    log = txaio.make_logger()

    def __init__(self, url, realm, extra=None, serializers=None, ssl=None, proxy=None, headers=None):
        super(JunoRunner, self).__init__(url, realm, extra=extra, serializers=serializers, ssl=ssl, proxy=proxy)
        self.headers = headers

    def run(self, make, start_reactor=True):
        """
        Run the application component.
        :param make: A factory that produces instances of :class:`autobahn.asyncio.wamp.ApplicationSession`
           when called with an instance of :class:`autobahn.wamp.types.ComponentConfig`.
        :type make: callable
        :param start_reactor: if True (the default) this method starts
           the Twisted reactor and doesn't return until the reactor
           stops. If there are any problems starting the reactor or
           connect()-ing, we stop the reactor and raise the exception
           back to the caller.
        :returns: None is returned, unless you specify
            ``start_reactor=False`` in which case the Deferred that
            connect() returns is returned; this will callback() with
            an IProtocol instance, which will actually be an instance
            of :class:`WampWebSocketClientProtocol`
        """
        if start_reactor:
            # only select framework, set loop and start logging when we are asked
            # start the reactor - otherwise we are running in a program that likely
            # already tool care of all this.
            from twisted.internet import reactor
            txaio.use_twisted()
            txaio.config.loop = reactor
            txaio.start_logging(level='info')

        isSecure, host, port, resource, path, params = parse_url(self.url)

        # factory for use ApplicationSession
        def create():
            cfg = ComponentConfig(self.realm, self.extra)
            try:
                session = make(cfg)
            except Exception as e:
                if start_reactor:
                    # the app component could not be created .. fatal
                    self.log.error(str(e))
                    reactor.stop()
                else:
                    # if we didn't start the reactor, it's up to the
                    # caller to deal with errors
                    raise
            else:
                return session

        # create a WAMP-over-WebSocket transport client factory
        transport_factory = WampWebSocketClientFactory(create, url=self.url, serializers=self.serializers, proxy=self.proxy, headers=self.headers)

        # supress pointless log noise like
        # "Starting factory <autobahn.twisted.websocket.WampWebSocketClientFactory object at 0x2b737b480e10>""
        transport_factory.noisy = False

        # if user passed ssl= but isn't using isSecure, we'll never
        # use the ssl argument which makes no sense.
        context_factory = None
        if self.ssl is not None:
            if not isSecure:
                raise RuntimeError(
                    'ssl= argument value passed to %s conflicts with the "ws:" '
                    'prefix of the url argument. Did you mean to use "wss:"?' %
                    self.__class__.__name__)
            context_factory = self.ssl
        elif isSecure:
            from twisted.internet.ssl import optionsForClientTLS
            context_factory = optionsForClientTLS(host)

        from twisted.internet import reactor
        if self.proxy is not None:
            from twisted.internet.endpoints import TCP4ClientEndpoint
            client = TCP4ClientEndpoint(reactor, self.proxy['host'], self.proxy['port'])
            transport_factory.contextFactory = context_factory
        elif isSecure:
            from twisted.internet.endpoints import SSL4ClientEndpoint
            assert context_factory is not None
            client = SSL4ClientEndpoint(reactor, host, port, context_factory)
        else:
            from twisted.internet.endpoints import TCP4ClientEndpoint
            client = TCP4ClientEndpoint(reactor, host, port)

        d = client.connect(transport_factory)

        # as the reactor shuts down, we wish to wait until we've sent
        # out our "Goodbye" message; leave() returns a Deferred that
        # fires when the transport gets to STATE_CLOSED
        def cleanup(proto):
            if hasattr(proto, '_session') and proto._session is not None:
                if proto._session.is_attached():
                    return proto._session.leave()
                elif proto._session.is_connected():
                    return proto._session.disconnect()

        # when our proto was created and connected, make sure it's cleaned
        # up properly later on when the reactor shuts down for whatever reason
        def init_proto(proto):
            reactor.addSystemEventTrigger('before', 'shutdown', cleanup, proto)
            return proto

        # if we connect successfully, the arg is a WampWebSocketClientProtocol
        d.addCallback(init_proto)

        # if the user didn't ask us to start the reactor, then they
        # get to deal with any connect errors themselves.
        if start_reactor:
            # if an error happens in the connect(), we save the underlying
            # exception so that after the event-loop exits we can re-raise
            # it to the caller.

            class ErrorCollector(object):
                exception = None

                def __call__(self, failure):
                    self.exception = failure.value
                    reactor.stop()
            connect_error = ErrorCollector()
            d.addErrback(connect_error)

            # now enter the Twisted reactor loop
            reactor.run()

            # if we exited due to a connection error, raise that to the
            # caller
            if connect_error.exception:
                raise connect_error.exception

        else:
            # let the caller handle any errors
            return d
