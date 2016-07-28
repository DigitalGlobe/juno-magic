import JupyterReact from 'jupyter-react-js';
import dispatcher from './components/dispatcher'; 
import components from './components'; 

const on_update = ( module, props ) => {
  dispatcher.dispatch({
    actionType: module.toLowerCase() + '_update',
    data: props
  });
}

function load_ipython_extension () {
  requirejs([
      "base/js/namespace",
      "base/js/events",
  ], function( Jupyter, events ) {
      $('#kernel_indicator').append('<span id="juno_status"></span>');
      JupyterReact.init( Jupyter, events, 'juno', { components, on_update } );
  });
}

module.exports = {
  load_ipython_extension: load_ipython_extension
};
