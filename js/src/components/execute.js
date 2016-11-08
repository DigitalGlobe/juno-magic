import React from 'react';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

class Execution extends React.Component {

  constructor( props ) {
    super( props );
    this.state = { 
    };
  }

  componentWillMount(){
    this.setState({ ...this.state, ...this.props.cell.metadata } );
  }

  @autobind 
  change( e ) {
    e.stopPropagation();
    this.props.cell.metadata.remote = !this.state.remote;
    this.setState( { remote: !this.state.remote } );
  }

  render() {
    const { remote } = this.state;
    const classes = classNames( '', {
      'remote': remote
    } );

    const text = remote ? 'remote' : 'local';

    return ( 
      <a href="#" onClick={ this.change } className={ classes }>{ text }</a>
    );
  }
}

export default Execution;
