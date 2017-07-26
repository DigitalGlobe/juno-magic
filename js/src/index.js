function load_ipython_extension() {

  var extensionLoaded = false;

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

    var reqReact = window.requirejs.config({
      paths: {
        'react': host + '/juno/react',
        'react-dom': host + '/juno/react-dom'
      }
    });

    reqReact([ 'react', 'react-dom' ], () => {
      reqReact([ host + '/juno/vendor.js'], () => {
        reqReact([ host + '/juno/nbextension.js'], () => {});
      });
    });
  }

  requirejs( [
    "base/js/namespace",
    "base/js/events"
  ], function( Jupyter, Events ) {
    // On new kernel session create new comm managers
    if ( Jupyter.notebook && Jupyter.notebook.kernel ) {
      loadJuno( '//' + window.location.host )
    }
    Events.on( 'kernel_created.Kernel kernel_created.Session', ( event, data ) => {
      loadJuno( '//' + window.location.host );
    });
  });
}

module.exports = {
  load_ipython_extension: load_ipython_extension
};
