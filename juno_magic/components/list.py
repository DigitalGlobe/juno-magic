from component import Component, CallbackDispatcher
from IPython import get_ipython
from IPython.display import display, Javascript, HTML, publish_display_data
from IPython.core.formatters import DisplayFormatter

def publish_to_display(obj):
    output, _ = DisplayFormatter().format(obj)
    publish_display_data(output)

class List(Component):
    module = 'List'

    def __init__(self, prefix_map, **kwargs):
        super(List, self).__init__(props={'items': prefix_map})
        self._select_handlers = CallbackDispatcher()
        self.on_msg(self._handle_select_msg)

    def on_select(self, callback, remove=False):
        #print 'setting select callback:', callback
        self._select_handlers.register_callback( callback,  remove=remove )

    def _handle_select_msg(self, _, content, buffers):
        #print 'final msg handler'
        #if content.get('method', '') == 'select':
        self._select_handlers(self)
