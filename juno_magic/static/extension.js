define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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


/***/ }
/******/ ])});;