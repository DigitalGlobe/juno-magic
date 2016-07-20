from ipykernel.comm import Comm
from IPython.display import display, Javascript
from IPython.core.getipython import get_ipython
from traitlets import HasTraits, Instance, List, observe
from traitlets.config import LoggingConfigurable


class CallbackDispatcher(LoggingConfigurable):
    callbacks = List()

    def __call__(self, *args, **kwargs):
        value = None
        for callback in self.callbacks:
            try:
                print 'calling...'
                local_value = callback(*args, **kwargs)
            except Exception as e:
                ip = get_ipython()
                if ip is None:
                    self.log.warn("Exception in callback %s: %s", callback, e, exc_info=True)
                else:
                    ip.showtraceback()
            else:
                value = local_value if local_value is not None else value
        return value

    def register_callback(self, callback, remove=False):
        # (Un)Register the callback.
        if remove and callback in self.callbacks:
            self.callbacks.remove(callback)
        elif not remove and callback not in self.callbacks:
            self.callbacks.append(callback)


class Component(LoggingConfigurable):

  @staticmethod
  def handle_comm_opened(comm, msg):
      """Static method, called when a widget is constructed."""
      print 'Handle Comm Opened'

  comm = Instance('ipykernel.comm.Comm', allow_none=True)

  _display_callbacks = Instance(CallbackDispatcher, ())
  _msg_callbacks = Instance(CallbackDispatcher, ())

  def __init__(self, target_name='juno', props={}):
      self.target_name = target_name
      self.props = props
      self.open(props)

  def __del__(self):
      self.close()

  def open(self, props):
      print 'opening comm...'
      props['module'] = self.module
      args = dict(target_name=self.target_name, data=props)
      self.comm = Comm(**args)

  @observe('comm')
  def _comm_changed(self, change):
      """Called when the comm is changed."""
      if change['new'] is None:
          return
      print 'setting on msg handler on comm'
      self.comm.on_msg(self._handle_msg)

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

  def _handle_msg(self, msg):
      print 'got a message', msg
      #"""Called when a msg is received from the front-end"""
      #data = msg['content']['data']
      self._msg_callbacks(self, msg, msg['buffers'])
      #self._msg_callbacks(self, data['content'], msg['buffers'])
      #self._handle_msg(data['content'], msg['buffers'])
      #method = data['method']
      #if 'content' in data:
      # Catch remainder.
      #else:
      #    self.log.error('Unknown front-end to back-end widget msg with method "%s"' % method)


  def on_msg(self, callback, remove=False):
      #print 'register on_msg handler', callback
      self._msg_callbacks.register_callback(callback, remove=remove)

