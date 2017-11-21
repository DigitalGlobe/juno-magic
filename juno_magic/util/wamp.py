from juno_magic.exception import *

def cleanup_session(proto):
    if hasattr(proto, '_session') and proto._session is not None:
        if proto._session.is_attached():
            return proto._session.leave()
        elif proto._session.is_connected():
            return proto._session.disconnect()

def get_session_info(proto):
    msg = {"session_info": {"was_clean": proto.wasClean,
                            "reason_not_clean": proto.wasNotCleanReason,
                            "closed_by_me": proto.closedByMe,
                            "dropped_by_me": proto.droppedByMe,
                            "failed_by_me": proto.failedByMe}
           }
    return msg

def get_connection_error(proto):
    if proto is not None and not proto.wasClean:
        if proto.wasCloseHandshakeTimeout:
            return CloseHandshakeError(proto.wasNotCleanReason)
        elif proto.wasMaxFramePayloadSizeExceeded:
            return MaxFramePayloadSizeExceededError(proto.wasNotCleanReason)
        elif proto.wasMaxMessagePayloadSizeExceeded:
            return MaxMessagePayloadSizeExceededError(proto.wasNotCleanReason)
        elif proto.wasOpenHandshakeTimeout:
            return OpenHandshakeTimeoutError(proto.wasNotCleanReason)
        elif proto.wasServerConnectionDropTimeout:
            return ServerConnectionDropTimeout(proto.wasNotCleanReason)
        elif proto.wasServingFlashSocketPolicyFile:
            return ServingFlashSocketPolicyFileError(proto.wasNotCleanReason)
        elif proto.wasMaxFramePayloadSizeExceeded:
            return MaxFramePayloadSizeExceededError(proto.wasNotCleanReason)
        elif proto.wasMaxMessagePayloadSizeExceeded:
            return MaxMessagePayloadSizeExceededError(proto.wasNotCleanReason)
        elif proto.wasNotCleanReason is not None:
            return ConnectError(proto.wasNotCleanReason)
    return None
