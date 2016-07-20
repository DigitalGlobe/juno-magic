from juno_magic.extensions.wamp import JunoMagics
from components import Component

def load_ipython_extension(ip):
    ip.register_magics(JunoMagics)

def register_comm_target(kernel=None):
    """Register the jupyter.widget comm target"""
    if kernel is None:
        kernel = get_ipython().kernel
    kernel.comm_manager.register_target('juno', Component.handle_comm_opened)

# deprecated alias
handle_kernel = register_comm_target

def _handle_ipython():
    """Register with the comm target at import if running in IPython"""
    ip = get_ipython()
    if ip is None:
        return

    if not hasattr(ip, 'kernel'):
        return
    register_comm_target(ip.kernel)

_handle_ipython()



def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'juno_magic',
        'require': 'juno_magic/index'
    }]
