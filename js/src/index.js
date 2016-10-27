import React from 'react';
import { render } from 'react-dom';
import './css/juno.css';

import App from './app';

function load_ipython_extension () {
  // create the side bar dom
  const sidebar = document.createElement( 'div' );
  sidebar.classList.add( 'juno-sidebar' );
  const notebookContainer = document.getElementById( 'notebook-container' );
  notebookContainer.getElementsByTagName("div")[0].appendChild( sidebar );

  const app = React.createElement( App, {} );
  render( app, sidebar );
}

module.exports = {
  load_ipython_extension: load_ipython_extension
};
