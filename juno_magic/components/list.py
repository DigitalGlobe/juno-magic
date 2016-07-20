from component import Component
from IPython import get_ipython
from IPython.display import display, Javascript, HTML, publish_display_data
from IPython.core.formatters import DisplayFormatter
from IPython import get_ipython
import logging

import os
logger = logging.getLogger("tornado.general")

def publish_to_display(obj):
    logger.error("publishing")
    output, _ = DisplayFormatter().format(obj)
    # get_ipython().display_pub.publish(output)
    publish_display_data(output)

class List(Component):
    module = 'List'

    def __init__(self, prefix_map, **kwargs):
        super(self.__class__, self).__init__()
        self.open({'items': prefix_map})
        self.comm.on_msg( publish_to_display )

    def listen(self, msg):
        method = msg['content']['data']['method']
        if method == 'select':
            self.select(msg['content']['data'])

    def select(self, kernel):
        logger.error('SELECT A Kernel! {}'.format(kernel))
        logger.error('PID: {}'.format(os.getpid()))
#publish_to_display(Javascript("IPython.notebook.insert_cell_below('code', IPython.notebook.selected_cell_index());"))
        #ip = get_ipython()
        #index = ip.notebook.get_selected_index()
        #ip.insert_cell_below('code', index)
