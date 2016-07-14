#from IPython import get_ipython
from .extensions.wamp import JunoMagics
#from .components.component import Component 

def load_ipython_extension(ip):
    ip.register_magics(JunoMagics)
    #register_comm_target(ip.kernel)

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'juno_magic',
        'require': 'juno_magic/index'
    }]

#def register_comm_target(kernel=None):
#    """Register the jupyter.react comm target"""
#    if kernel is None:
#        kernel = get_ipython().kernel
#    print 'register comm juno'
#    kernel.comm_manager.register_target('juno', Component.handle_comm_opened)

# deprecated alias
#handle_kernel = register_comm_target
