import React from 'react';
import classNames from 'classnames';
import dispatcher from './dispatcher.js';

class Status extends React.Component {

  constructor( props ) {
    super( props );
    this.state = { 
      status: 'idle' 
    };
  }

  componentWillMount(){
    dispatcher.register( payload => {
      if ( payload.actionType === 'status_update' ) {
        this.setState({ status: payload.data.status })
      }
    } );
  }

  render() {
    const { status } = this.state;
    const classes = classNames(
      'kernel_idle_icon', {
        'kernel_busy_icon': status === 'busy'
    } );

    return ( 
      <span id="juno_status">
        <span class="kernel_indicator_name">Juno</span>&nbsp;
        <i id="juno-status" className={ classes }></i>
      </span>
    );
  }
}

export default Status;
