from jupyter_react import Component, CallbackDispatcher

class List(Component):
    module = 'List'

    def __init__(self, prefix_map, **kwargs):
        super(List, self).__init__(target_name='juno', props={'items': prefix_map})
        self._select_handlers = CallbackDispatcher()
        self.on_msg(self._handle_select_msg)

    def on_select(self, callback, remove=False):
        self._select_handlers.register_callback( callback,  remove=remove )

    def _handle_select_msg(self, _, content, buffers):
        if content['data'].get('method', '') == 'select':
            self._select_handlers(self, content, buffers)
