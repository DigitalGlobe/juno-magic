// Configure requirejs
if (window.require) {
    window.require.config({
        map: {
            "*" : {
                "react": "https://fb.me/react-15.2.1.min.js",
                "react-dom": "https://fb.me/react-dom-15.2.1.min.js"
            }
        }
    });
}


function add_css(url) {
  $('<link/>')
      .attr({
          rel: 'stylesheet',
          href: window.require.toUrl(url),
          type: 'text/css'
      })
      .appendTo('head');
}

// Export the required load_ipython_extention
module.exports = {
    load_ipython_extension: function() {
      window.require(['react', 'reactDom'], function( React, ReactDom ) {
        window.React = React;
        window.ReactDom = ReactDom;
      });
      add_css('./nbextensions/juno_magic/juno.css');

      $('#kernel_indicator').append('<span id="juno_status"><span class="kernel_indicator_name">Juno</span><i id="juno-status" class="kernel_idle_icon"></i></span>');

      $('#juno_status').on('update', function( event, newStatus ){
        var busy = "kernel_busy_icon";
        var el = $( '#juno-status' );
        if ( newStatus === 'idle' ) {
          el.removeClass(busy);
        } else if ( newStatus === 'busy' ) {
          el.addClass(busy);
        }
      });
    }    
};
