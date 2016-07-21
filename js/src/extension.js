import JupyterReact from 'jupyter-react-js';
import dispatcher from './components/dispatcher'; 
import components from './components'; 

const on_update = ( module, props ) => {
  dispatcher.dispatch({
    actionType: module.toLowerCase() + '_update',
    data: props 
  });
}

const Component = JupyterReact.Component( { on_update, components } );

const handle_kernel = function(Jupyter, kernel) {
    if ( kernel.comm_manager && !kernel.component_manager ) {
      kernel.component_manager = new JupyterReact.Manager( 'juno', kernel, Component );
    }
};

function register_events(Jupyter, events) {
    if (Jupyter.notebook && Jupyter.notebook.kernel) {
        handle_kernel(Jupyter, Jupyter.notebook.kernel);
    }
    events.on('kernel_created.Kernel kernel_created.Session', function(event, data) {
        handle_kernel(Jupyter, data.kernel);
    });
}

function add_css(url) {
  $('<link/>')
      .attr({
          rel: 'stylesheet',
          href: window.require.toUrl(url),
          type: 'text/css'
      })
      .appendTo('head');
}

function load_ipython_extension () {
    return new Promise(function(resolve) {
        requirejs([
            "base/js/namespace",
            "base/js/events"
        ], function( Jupyter, events ) {
            $('#kernel_indicator').append('<span id="juno_status"></span>');
            register_events(Jupyter, events);
            console.log("loaded juno");
            resolve();
        });
    });
}

module.exports = {
  load_ipython_extension: load_ipython_extension
};
