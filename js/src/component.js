// Generic Component that handles comm messages and renders components to notebook cells

module.exports = function Component( comm, props, domId ) {

  var handle_msg = function( msg ) {
    var data = msg.content.data;    

    if ( props.module && Juno.components[ props.module ] ) {
      switch ( data.method ) {
        case "update":
          var element = _createMarkup( props.module, data );
          _render( element, msg );
          break;
        case "display":
          var element = _createMarkup( props.module, props );
          _render( element, msg );
          break;
      }
    }
  };

  var _render = function( element, msg ){ 
    var display;
    if ( domId ) {
      display = document.getElementById( domId );
    } else {
      display = _outputAreaElement( msg );
    }
    ReactDom.render( element, display );
  };


  var _createMarkup = function( mod, newProps ){
    return React.createElement( Juno.components[ mod ], newProps );
  };


  // TODO this is sketchy
  // improve lookup of msg cell's "output_area.output_subarea" 
  var _outputAreaElement = function( msg ) {
    var msg_id = msg.parent_header.msg_id;
    var parentEl = Jupyter.notebook.get_msg_cell( msg_id ).output_area.element[0];
    var output_area = parentEl.children[0];
    return output_area.children[1];
  }

  comm.on_msg( handle_msg );
  return this;
};
