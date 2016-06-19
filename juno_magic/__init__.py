from .extensions.wamp import JunoMagics

def load_ipython_extension(ip):
    ip.register_magics(JunoMagics)
