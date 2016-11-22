from jupyter_client.blocking.client import BlockingKernelClient

# (Nov 22, 2016) NOTE: The following CustomBlockingKernelClient class defined below implements an execute_interactive method which is not included
# in the current packaged release (v4.4), but is currently merged into the master branch of jupyter_client: https://github.com/jupyter/jupyter_client/blob/master/jupyter_client/blocking/client.py
# This usage of this class should be discontinued when a new jupyter_client package is released that supports this (or some similar) method. 
class CustomBlockingKernelClient(BlockingKernelClient):
    def execute_interactive(self, code, silent=False, store_history=True,
             user_expressions=None, allow_stdin=None, stop_on_error=True,
             timeout=None, output_hook=None, stdin_hook=None,
            ):
        """Execute code in the kernel interactively
        Output will be redisplayed, and stdin prompts will be relayed as well.
        If an IPython kernel is detected, rich output will be displayed.
        You can pass a custom output_hook callable that will be called
        with every IOPub message that is produced instead of the default redisplay.
        Parameters
        ----------
        code : str
            A string of code in the kernel's language.
        silent : bool, optional (default False)
            If set, the kernel will execute the code as quietly possible, and
            will force store_history to be False.
        store_history : bool, optional (default True)
            If set, the kernel will store command history.  This is forced
            to be False if silent is True.
        user_expressions : dict, optional
            A dict mapping names to expressions to be evaluated in the user's
            dict. The expression values are returned as strings formatted using
            :func:`repr`.
        allow_stdin : bool, optional (default self.allow_stdin)
            Flag for whether the kernel can send stdin requests to frontends.
            Some frontends (e.g. the Notebook) do not support stdin requests.
            If raw_input is called from code executed from such a frontend, a
            StdinNotImplementedError will be raised.
        stop_on_error: bool, optional (default True)
            Flag whether to abort the execution queue, if an exception is encountered.
        timeout: float or None (default: None)
            Timeout to use when waiting for a reply
        output_hook: callable(msg)
            Function to be called with output messages.
            If not specified, output will be redisplayed.
        stdin_hook: callable(msg)
            Function to be called with stdin_request messages.
            If not specified, input/getpass will be called.
        Returns
        -------
        reply: dict
            The reply message for this request
        """
        if not self.iopub_channel.is_alive():
            raise RuntimeError("IOPub channel must be running to receive output")
        if allow_stdin is None:
            allow_stdin = self.allow_stdin
        if allow_stdin and not self.stdin_channel.is_alive():
            raise RuntimeError("stdin channel must be running to allow input")
        msg_id = self.execute(code,
                              silent=silent,
                              store_history=store_history,
                              user_expressions=user_expressions,
                              allow_stdin=allow_stdin,
                              stop_on_error=stop_on_error,
        )
        if stdin_hook is None:
            stdin_hook = self._stdin_hook_default
        if output_hook is None:
            # detect IPython kernel
            if 'IPython' in sys.modules:
                from IPython import get_ipython
                ip = get_ipython()
                in_kernel = getattr(ip, 'kernel', False)
                if in_kernel:
                    output_hook = partial(
                        self._output_hook_kernel,
                        ip.display_pub.session,
                        ip.display_pub.pub_socket,
                        ip.display_pub.parent_header,
                    )
        if output_hook is None:
            # default: redisplay plain-text outputs
            output_hook = self._output_hook_default

        # set deadline based on timeout
        if timeout is not None:
            deadline = monotonic() + timeout
        else:
            timeout_ms = None

        poller = zmq.Poller()
        iopub_socket = self.iopub_channel.socket
        poller.register(iopub_socket, zmq.POLLIN)
        if allow_stdin:
            stdin_socket = self.stdin_channel.socket
            poller.register(stdin_socket, zmq.POLLIN)
        else:
            stdin_socket = None

        # wait for output and redisplay it
        while True:
            if timeout is not None:
                timeout = max(0, deadline - monotonic())
                timeout_ms = 1e3 * timeout
            events = dict(poller.poll(timeout_ms))
            if not events:
                raise TimeoutError("Timeout waiting for output")
            if stdin_socket in events:
                req = self.stdin_channel.get_msg(timeout=0)
                stdin_hook(req)
                continue
            if iopub_socket not in events:
                continue

            msg = self.iopub_channel.get_msg(timeout=0)

            if msg['parent_header'].get('msg_id') != msg_id:
                # not from my request
                continue
            output_hook(msg)

            # stop on idle
            if msg['header']['msg_type'] == 'status' and \
            msg['content']['execution_state'] == 'idle':
                break

        # output is done, get the reply
        if timeout is not None:
            timeout = max(0, deadline - monotonic())
        return self._recv_reply(msg_id, timeout=timeout)