import React from 'react';
import { render } from 'react-dom';
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
  
  // create the side bar dom
  const sidebar = document.createElement( 'div' );
  sidebar.classList.add( 'juno-sidebar' );
  const notebookContainer = document.getElementById( 'notebook-container' );
  notebookContainer.insertBefore( sidebar, notebookContainer.firstChild );

  $('#kernel_indicator')
    .append('<span id="juno_status"><span class="kernel_indicator_name">Juno</span><i id="juno-status" class="kernel_idle_icon"></i></span>');

  const app = React.createElement( App, {} );
  render( app, sidebar );
}

module.exports = {
  load_ipython_extension: load_ipython_extension
};
