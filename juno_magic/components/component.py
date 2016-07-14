from ipykernel.comm import Comm
from IPython.display import display

class Component():

  def __init__(self, target='juno', render=False, **kwargs):
      self.target = target 
      self.module = kwargs.pop('module', None)
      self.open(kwargs.pop('props', {}))
      if render:
          self.send({"method": "display"})

  def open(self, props):
      props['module'] = self.module
      args = dict(target_name=self.target, data=props)
      self.comm = Comm(**args)

  def close(self):
      if self.comm is not None:
          self.comm.close()
          self.comm = None
          self._ipython_display_ = None

  def send(self, data):
      self.comm.send( data )

  def _ipython_display_(self, **kwargs):
      self.send({"method": "display"})
      data = { 'application/vnd.jupyter.widget': self.module }
      display(data, raw=True)

  def handle_comm_opened(self, comm, msg):
      module_name = str(msg['content']['data']['module'])
      print module_name

