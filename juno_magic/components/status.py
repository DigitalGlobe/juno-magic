from traitlets import Unicode, observe
from jupyter_react import Component

class Status(Component):
    module = 'Status'
    current_status = Unicode('idle', help="The current status of the remote kernel").tag(config=True)

    def __init__(self, **kwargs):
        super(self.__class__, self).__init__(target_name='juno')
        #self.open({'domId': 'juno_status'})
        self.send({"method": "display"})

    @observe('current_status')
    def _status_changed(self, change):
        if change['new'] is None:
            return
        self.send({'method':'update', 'props': { 'status': change['new'] }})
