from .extensions.wamp import JunoMagics

def load_ipython_extension(ip):
    ip.register_magics(JunoMagics)

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'juno_magic',
        'require': 'juno_magic/index'
    }]
