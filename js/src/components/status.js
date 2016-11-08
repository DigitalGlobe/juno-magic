import React from 'react';
import classNames from 'classnames';
import dispatcher from './dispatcher.js';

class Status extends React.Component {

  constructor( props ) {
    super( props );
    this.state = { 
      status: 'idle', 
      kernel: 'None' 
    };
  }

  componentWillMount() {
    window.onbeforeunload = () => this.props.comm.close();
    dispatcher.register( payload => {
      if ( payload.actionType === 'status_update' ) {
        this.setState({ ...this.state, ...payload.data } );
      }
    } );
  }

  render() {
    const { status, kernel } = this.state;
    const classes = classNames(
      'kernel_idle_icon', {
        'kernel_busy_icon': status === 'busy'
    } );

    return ( 
      <span id="juno_status">
        <span className="kernel_indicator_name">{ `Juno [${ kernel }]` }</span>&nbsp;
        <i id="juno-status" className={ classes }></i>
      </span>
    );
  }
}

export default Status;
