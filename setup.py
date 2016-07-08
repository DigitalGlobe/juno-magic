from setuptools import setup

setup(name='juno-magic',
      version='0.1.9',
      description='IPython magics and utilities to work with bridged kernels',
      url='https://github.com/timbr-io/juno-magic',
      author='Pramukta Kumar',
      author_email='pramukta.kumar@timbr.io',
      license='MIT',
      packages=['juno_magic', 'juno_magic.extensions'],
      zip_safe=False,
      data_files=[
        ('share/jupyter/nbextensions/juno_magic', [
            'juno_magic/static/index.js',
            'juno_magic/static/juno.css'
        ]),
      ],
      entry_points={
          "console_scripts": [
              "wampify = juno_magic.bridge:main"
          ]
      },
      install_requires=[
          "ipython",
          "autobahn",
          "twisted",
          "txzmq",
          "sh",
          "pyopenssl",
          "service_identity",
          "requests",
          "zope.interface"
        ]
      )
