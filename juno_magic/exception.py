from twisted.internet.error import ConnectError, ConnectionLost
import inspect

# From StackOverflow: https://stackoverflow.com/questions/13937500/inherit-a-parent-class-docstring-as-doc-attribute
def inheritdocstring(name, bases, attrs):
    if not '__doc__' in attrs:
        # create a temporary 'parent' to (greatly) simplify the MRO search
        temp = type('temporaryclass', bases, {})
        for cls in inspect.getmro(temp):
            if cls.__doc__ is not None:
                attrs['__doc__'] = cls.__doc__
                break

    return type(name, bases, attrs)

class CloseHandshakeError(ConnectionLost):
    __metaclass__ = inheritdocstring

class MaxFramePayloadSizeExceededError(ConnectionLost):
    __metaclass__ = inheritdocstring

class MaxMessagePayloadSizeExceededError(ConnectionLost):
    __metaclass__ = inheritdocstring

class OpenHandshakeTimeoutError(ConnectError):
    __metaclass__ = inheritdocstring

class ServerConnectionDropTimeoutError(ConnectionLost):
    __metaclass__ = inheritdocstring

class ServingFlashSocketPolicyFileError(ConnectionLost):
    __metaclass__ = inheritdocstring

