function load_ipython_extension() {
  var extensionLoaded = false;
  var reqReact = window.requirejs.config({
    paths: {
      'react': 'https://unpkg.com/react@15/dist/react',
      'react-dom': 'https://unpkg.com/react-dom@15/dist/react-dom'
    }
  })

  function loadScript( host, name ) {
    var script = document.createElement( 'script' );
    script.src = name
      ? host + `/juno/${name}.js`
      : host;
    document.head.appendChild( script );
    return script;
  }

  function loadJuno( host ) {
    if ( extensionLoaded ) { return; }
    reqReact([ 'react', 'react-dom' ], () => {
      reqReact([ host + '/juno/vendor.js'], () => {
        reqReact([ host + '/juno/nbextension.js'], () => {});
      });
    });
  }

  function handleKernel( kernel ) {
    kernel.execute( "import os\nprint os.environ['JUNO_HOST']", {
      iopub: {
        output: function( response ) {
          var host = 'http://localhost:3000';
          //var host = 'drama.timbr.io';
          //var host = 'app0.timbr.io';
          if ( response.msg_type === 'stream' ) {
            host = response.content.text;
          }
          loadJuno( host );
        }
      }
    }, { silent: false } ); 
  }

  requirejs( [
    "base/js/namespace",
    "base/js/events"
  ], function( Jupyter, Events ) {
    // On new kernel session create new comm managers
    if ( Jupyter.notebook && Jupyter.notebook.kernel ) {
      handleKernel( Jupyter.notebook.kernel );
    }
    Events.on( 'kernel_created.Kernel kernel_created.Session', ( event, data ) => {
      handleKernel( data.kernel );
    });
  });
}

module.exports = {
  load_ipython_extension: load_ipython_extension
};
