from twisted.internet.error import ConnectError, ConnectionLost

class CloseHandshakeError(ConnectionLost):
    pass

class MaxFramePayloadSizeExceededError(ConnectionLost):
    pass

class MaxMessagePayloadSizeExceededError(ConnectionLost):
    pass

class OpenHandshakeTimeoutError(ConnectError):
    pass

class ServerConnectionDropTimeoutError(ConnectionLost):
    pass

class ServingFlashSocketPolicyFileError(ConnectionLost):
    pass

