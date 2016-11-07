import React from 'react';
import { render } from 'react-dom';
import JupyterReact from 'jupyter-react-js';
import components from './components';
import dispatcher from './components/dispatcher';
import './css/juno.css';

import App from './app';

function load_ipython_extension () {

  // TODO
  // require events  
  /*
    events.on( 'create.Cell', ( event, data ) => {
      get cell, override get_text to add %% juno when nb metadata has a kernel
    });
  */

  requirejs([
    "base/js/namespace",
    "base/js/events",
  ], function( Jupyter, events ) {
  
    // create the side bar dom
    const sidebar = document.createElement( 'div' );
    sidebar.classList.add( 'juno-sidebar' );
    const notebookContainer = document.getElementById( 'notebook-container' );
    notebookContainer.insertBefore( sidebar, notebookContainer.firstChild );

    const statusWrapper = document.createElement( 'span' );
    statusWrapper.id = "juno_status_wrapper";
    const indicator = document.getElementById( 'kernel_indicator' );
    indicator.appendChild( statusWrapper );
    
    const on_update = ( module, props ) => {
      dispatcher.dispatch({
        actionType: module.toLowerCase() + '_update',
        data: props
      });
    }

    JupyterReact.init( Jupyter, events, 'juno.status', { components, on_update, element: statusWrapper } );
    
    const app = React.createElement( App, {} );
    render( app, sidebar );

  });
}

module.exports = {
  load_ipython_extension: load_ipython_extension
};
