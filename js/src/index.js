import React from 'react';
import { render } from 'react-dom';
import components from './components';

import '!style!css!./css/juno.css';

import App from './app';

function load_ipython_extension () {

  requirejs([
    "base/js/namespace",
    "base/js/events"
  ], function( Jupyter, events ) {
  
    const sidebar = document.createElement( 'div' );
    sidebar.classList.add( 'juno-sidebar' );
    const notebookContainer = document.getElementById( 'notebook-container' );
    notebookContainer.insertBefore( sidebar, notebookContainer.firstChild );

    const app = React.createElement( App, {} );
    render( app, sidebar );

  });
}

module.exports = {
  load_ipython_extension: load_ipython_extension
};
