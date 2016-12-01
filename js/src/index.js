import React from 'react';
import { render } from 'react-dom';
import components from './components';
import execute from './lib/cell';

import '!style!css!./css/juno.css';

import App from './app';

function load_ipython_extension () {

  const handleCell = cell => {
    const flag = document.createElement( 'div' );
    flag.className = 'execution-flag';
    cell.input[0].appendChild( flag );

    const execution = React.createElement( components.Execute, { cell } );
    render( execution, flag ); 

    if ( Jupyter.notebook.metadata.juno_kernel ) {
      cell.metadata.remote = typeof cell.metadata.remote === 'undefined' ? true : cell.metadata.remote;
    }
    cell.execute = execute;
  };

  requirejs([
    "base/js/namespace",
    "base/js/events"
  ], function( Jupyter, events ) {
  
    //------- MACHINE UI --------//
    const sidebar = document.createElement( 'div' );
    sidebar.classList.add( 'juno-sidebar' );
    const notebookContainer = document.getElementById( 'notebook' );
    notebookContainer.insertBefore( sidebar, notebookContainer.firstChild );

    const app = React.createElement( App, {} );
    render( app, sidebar );


    //------- CELL Overides ------//
    const cells = Jupyter.notebook.get_cells();
    cells.forEach( cell => {
      handleCell( cell );
    });

    events.on( 'create.Cell', ( event, data ) => {
      handleCell( data.cell );
    });

  });
}

module.exports = {
  load_ipython_extension: load_ipython_extension
};
