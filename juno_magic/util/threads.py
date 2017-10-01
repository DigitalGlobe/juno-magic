import sys
if sys.version_info >= (3, 0):
    import queue as Queue
else:
    import Queue

from twisted.python import failure
from twisted.internet.defer import Deferred, maybeDeferred


def blockingCallFromThread(reactor, f, queue=Queue.Queue(), timeout=120, timeout_handler=None,  *a, **kw):
    """
    Adapted from twisted's twisted.internet.threads.blockingCallFromThread
    to optionally pass a queue, a timeout, and a timeout handler.
    Run a function in the reactor from a thread, and wait for the result
    synchronously.  If the function returns a L{Deferred}, wait for its
    result and return that. If timeout_handler is a callable, call
    timeout_handler once if we wait longer than timeout, then continue waiting.
    @param reactor: The L{IReactorThreads} provider which will be used to
        schedule the function call.
    @param f: the callable to run in the reactor thread
    @type f: any callable.
    @param queue: a standard python queue, should be empty when passed
    @type queue: Queue.Queue
    @param timeout: time to wait before calling timeout_handler, if given.
    @type timeout: integer
    @param timeout_handler: a function to call if we wait longer than timeout.
    @type: any callable
    @param a: the arguments to pass to C{f}.
    @param kw: the keyword arguments to pass to C{f}.
    @return: the result of the L{Deferred} returned by C{f}, or the result
        of C{f} if it returns anything other than a L{Deferred}.
    @raise: If C{f} raises a synchronous exception,
        C{blockingCallFromThread} will raise that exception.  If C{f}
        returns a L{Deferred} which fires with a L{Failure},
        C{blockingCallFromThread} will raise that failure's exception (see
        L{Failure.raiseException}).
    """
    def _callFromThread():
        result = maybeDeferred(f, *a, **kw)
        result.addBoth(queue.put)

    reactor.callFromThread(_callFromThread)

    try:
        result = queue.get(timeout=timeout)
    except Queue.Empty:
        if callable(timeout_handler):
            timeout_handler()
        while True:
            try:
                result = queue.get(timeout=timeout)
                break
            except Queue.Empty:
                pass

    if isinstance(result, failure.Failure):
        result.raiseException()

    return result
