function load_ipython_extension() {
  var extensionLoaded = false;

  function loadJuno( host ) {
    if ( extensionLoaded ) { return; }
    var script = document.createElement( 'script' );
    script.src = 'http://' + host + '/juno/nbextension.js';
    document.getElementsByTagName( 'head' )[0].appendChild( script );
  }

  requirejs( [
    "base/js/namespace"
  ], function( Jupyter ) {
    Jupyter.notebook.kernel.execute( "import os\nprint os.environ['JUNO_HOST']", {
      iopub: {
        output: function( response ) {
          var host = 'localhost:3000';
          //var host = 'drama.timbr.io';
          //var host = 'app0.timbr.io';
          if ( response.msg_type === 'stream' ) {
            host = response.content.text;
          }
          loadJuno( host );
        }
      }
    }, { silent: false } );
  });
}

module.exports = {
  load_ipython_extension: load_ipython_extension
};
