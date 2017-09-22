from twisted.python.compat import _PY3
if not _PY3:
    import Queue
else:
    import queue as Queue

from twisted.python import failure
from twisted.internet import defer

# NOTE: the following blockingCallFromThread function is a customized function
# adapted from the function of the same name in twisted (as defined in version
# 17.5.0, current as of time of writing): see
# https://github.com/twisted/twisted/blob/e38cc25a67747899c6984d6ebaa8d3d134799415/src/twisted/internet/threads.py#L93.
# The relevant change introduces a new keyword argument that allows the caller
# to pass in an instance of a python queue. The documentation has been amended
# from the original to reflect this change.
def blockingCallFromThread(reactor, f, queue=Queue.Queue(), *a, **kw):
    """
    Run a function in the reactor from a thread, and wait for the result
    synchronously.  If the function returns a L{Deferred}, wait for its
    result and return that.
    @param reactor: The L{IReactorThreads} provider which will be used to
        schedule the function call.
    @param f: the callable to run in the reactor thread
    @type f: any callable.
    @param queue: an instance of a Python queue. If not provided, defaults to
        a new instance of a Python queue.
    @type queue: a Python queue instance.
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
        result = defer.maybeDeferred(f, *a, **kw)
        result.addBoth(queue.put)
    reactor.callFromThread(_callFromThread)
    result = queue.get()
    if isinstance(result, failure.Failure):
        result.raiseException()
    return result
