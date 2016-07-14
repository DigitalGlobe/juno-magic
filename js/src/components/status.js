import React from 'react';
import classNames from 'classnames';

class Status extends React.Component {

  constructor( props ){
    super( props );
    this.state = { 
      status: 'idle' 
    };
  }

  render() {

    const { status } = this.props;
    console.log('RENDER STATUS', this.props)

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
