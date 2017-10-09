from .wamp import JunoMagics

def load_ipython_extension(ip):
    from twisted.internet import reactor
    from threading import Thread
    _REACTOR_THREAD = Thread(target=reactor.run, args=(False,))
    _REACTOR_THREAD.start()
    ip.register_magics(JunoMagics)

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': '../static',
        'dest': '../juno_magic',
        'require': '../juno_magic/index'
    }]
