function setJunoStatus( junoStatus ) {
  var busy = "kernel_busy_icon";
  var el = $( '#juno-status' );
  if ( junoStatus === 'idle' ) {
    el.removeClass(busy);
  } else if ( junoStatus === 'busy' ) {
    el.addClass(busy);
  }
}

define(['require', 'jquery', 'base/js/namespace'], function( require, $, Jupyter ) {

  function add_css(url) {
    $('<link/>')
        .attr({
            rel: 'stylesheet',
            href: require.toUrl(url),
            type: 'text/css'
        })
        .appendTo('head');
  }

  return {

    /**
     * load_ipython_extension
     * Called when the extension is added to the notebook
     *
     */
    load_ipython_extension() {
      add_css('./juno.css');
      $('#kernel_indicator').append('<span id="juno_status"><span class="kernel_indicator_name">Juno</span><i id="juno-status" class="kernel_idle_icon"></i></span>'); 
      //$( [ Jupyter.events ] ).on( 'kernel_ready.Kernel', function() {
    } 
  } 
});
