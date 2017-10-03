from .wamp import JunoMagics

def load_ipython_extension(ip):
    ip.register_magics(JunoMagics)

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': '/Users/jamiepolackwich1/juno-magic/static',
        'dest': '/Users/jamiepolackwich1/juno_magic',
        'require': '/Users/jamiepolackwich1/juno_magic/index'
    }]
