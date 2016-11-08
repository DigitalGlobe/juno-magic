export default function execute( stop_on_error ) {
  if ( !this.kernel ) {
    console.log("Can't execute cell since kernel is not set.");
    return;
  }

  if ( stop_on_error === undefined ) {
    stop_on_error = true;
  }

  this.output_area.clear_output( false, true );
  var old_msg_id = this.last_msg_id;
  if ( old_msg_id ) {
    this.kernel.clear_callbacks_for_msg( old_msg_id );
    //delete CodeCell.msg_cells[ old_msg_id ];
    this.last_msg_id = null;
  }
  if (this.get_text().trim().length === 0) {
    // nothing to do
    this.set_input_prompt(null);
    return;
  }
  this.set_input_prompt( '*' );
  this.element.addClass( "running" );
  var callbacks = this.get_callbacks();
  let code = this.get_text();
  if ( Jupyter.notebook.metadata.juno_kernel && this.metadata.remote ) {
    code = '%%juno\n' + code;
  } 
  this.last_msg_id = this.kernel.execute( code, callbacks, { 
    silent: false, 
    store_history: true,
    stop_on_error: stop_on_error
  } );
  //CodeCell.msg_cells[ this.last_msg_id ] = this;
  this.render();
  this.events.trigger( 'execute.CodeCell', { cell: this } );
}
