from ipykernel.comm import Comm
from IPython.display import display, Javascript
from traitlets import HasTraits

#import sys
#reload(sys)
#sys.setdefaultencoding("utf-8")
import logging
logger = logging.getLogger("tornado.general")

class Component(HasTraits):

  def __init__(self, target_name='juno', props={}):
      self.target_name = target_name
      self.props = {}

#  def __del__(self):
#      self.close()

  def open(self, props):
      props['module'] = self.module
      args = dict(target_name=self.target_name, data=props)
      self.comm = Comm(**args)
      logger.error("Comm opened: {}".format(self.comm.comm_id))


  def close(self):
      logger.error("Comm closed")
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
