from twisted.internet.error import ConnectError, ConnectionLost

class CloseHandshakeError(ConnectionLost):
    """Connection to the other side was lost in a non-clean fashion"""

class MaxFramePayloadSizeExceededError(ConnectionLost):
    """Connection to the other side was lost in a non-clean fashion"""

class MaxMessagePayloadSizeExceededError(ConnectionLost):
    """Connection to the other side was lost in a non-clean fashion"""

class OpenHandshakeTimeoutError(ConnectError):
    """An error occurred while connecting"""

class ServerConnectionDropTimeoutError(ConnectionLost):
    """Connection to the other side was lost in a non-clean fashion"""

class ServingFlashSocketPolicyFileError(ConnectionLost):
    """Connection to the other side was lost in a non-clean fashion"""

