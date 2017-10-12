from jupyter_react import Component
from juno_magic.util.wamp import get_session_info, get_connection_error

class CommRegister(object):
    _register = dict()
    def __call__(self, target, **kwargs):
        if target not in self._register:
            self._register[target] = Component(target_name=target, **kwargs)
        return self._register[target]

comm_register = CommRegister()


class JunoComm(object):
    def __init__(self, domain, target="juno_magic.extensions.wamp", **kwargs):
        self._module = target
        self._domain = domain
        self._last_msg = None
        self._comm = comm_register(target, **kwargs)
        self._comm.on_msg(self._on_msg)

    def _on_msg(self, *args, **kwargs):
        pass

    def send(self, msg):
        self._last_msg = msg
        self._comm.send(msg)

    def _format_headers(self):
        return {"eventDispatcher": self.__class__.__name__,
                "eventDomain": self._domain
                }


class WampEventDispatcher(JunoComm):
    exception = None
    def __init__(self, magic, domain="local", **kwargs):
        self.magic = magic
        super(WampEventDispatcher, self).__init__(domain, **kwargs)

    def __call__(self, error=None):
        if error is None:
            error = get_connection_error(self.magic._wamp_runner)
        self.exception = error
        if error is not None:
            msg = self._format_msg(error)
            self.send(msg)

    def _format_msg(self, error):
        msg = self._format_headers()
        msg["eventLevel"] = "critical"
        details = {"eventCode":  str(error.__class__)}
        details.update(self.magic.wamp_config)
        details['details'] = str(error)
        if self.magic._has_protocol:
            details.update(get_session_info(self.magic._wamp_runner))
        msg["eventContext"] = details


class KernelEventDispatcher(JunoComm):
    def __init__(self, domain="remote", **kwargs):
        super(KernelEventDispatcher, self).__init__(domain, **kwargs)
        self._module = "juno_magic.extensions.wamp"

    def on_long_running_execute(self, timeout, msg_id):
        msg = self._format_headers()
        msg["module"] = "juno_magic.extensions.wamp"
        msg["eventLevel"] = "info"
        msg["eventContext"] = {"eventCode": "long_running_execute",
                               "eventDetails": {"timeOut": timeout,
                                                "msgId": msg_id}
                               }
        self.send(msg)

    def on_interrupt_fail(self, timeout, msg_id):
        msg = self._format_headers()
        msg["module"] = "juno_magic.extensions.wamp"
        msg["eventLevel"] = "critical"
        msg["eventContext"] = {"eventCode": "kernel_interrupt_fail",
                               "eventDetails": {"timeOut": timeout,
                                                "msgId": msg_id}
                               }
        self.send(msg)



