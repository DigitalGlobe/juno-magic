import React from 'react';

import machine from '@timbr/react-machine';

export default class App extends React.Component {
  render() {
    const sidebar = React.createElement( machine.Sidebar, {} );
    return ( <div>{ sidebar }</div> );
  }
};
