// Generic Component that handles comm messages and renders components to notebook cell

module.exports = function Component( comm, props ) {
  var module = props.content.data.module;
  var domId = props.content.data.domId;

  // Handle all messages over this comm
  var handle_msg = function( msg ) {
    var data = msg.content.data;

    if ( module && Juno.components[ module ] ) {
      switch ( data.method ) {
        case "update":
          Juno.components.dispatcher.dispatch({
            actionType: module.toLowerCase() + '_update',
            data: data.props 
          });
          break;
        case "display":
          var element = _createMarkup( module, props.content.data );
          _render( element, msg );
          break;
      }
    }
  };

  // Render the component to either the output cell or given domId
  var _render = function( element, msg ){ 
    var display;
    if ( domId ) {
      display = document.getElementById( domId );
    } else {
      display = _outputAreaElement( msg );
    }
    ReactDom.render( element, display );
  };


  // Create React Elements from components and props 
  var _createMarkup = function( mod, newProps ){
    newProps.comm = comm;
    return React.createElement( Juno.components[ mod ], newProps );
  };


  // TODO this is sketchy
  // improve lookup of msg cell's "output_area.output_subarea" 
  var _outputAreaElement = function( msg ) {
    var msg_id = msg.parent_header.msg_id;
    var parentEl = Jupyter.notebook.get_msg_cell( msg_id ).output_area.element[0];
    var output_area = parentEl.children[0];
    var newDiv = document.createElement("div");
    output_area.children[1].appendChild(newDiv); 

    //return output_area.children[1];
    return newDiv;
  }

  // register message callback
  comm.on_msg( handle_msg );
  return this;
};
