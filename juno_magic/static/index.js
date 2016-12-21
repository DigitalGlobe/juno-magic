define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	function load_ipython_extension() {
	  var extensionLoaded = false;
	
	  function loadJuno(host) {
	    if (extensionLoaded) {
	      return;
	    }
	    var script = document.createElement('script');
	    script.src = 'http://' + host + '/juno/nbextension.js';
	    document.getElementsByTagName('head')[0].appendChild(script);
	  }
	
	  requirejs(["base/js/namespace"], function (Jupyter) {
	    Jupyter.notebook.kernel.execute("import os\nprint os.environ['JUNO_HOST']", {
	      iopub: {
	        output: function output(response) {
	          var host = 'localhost:3000';
	          console.log(response, host);
	          //var host = 'drama.timbr.io';
	          //var host = 'app0.timbr.io';
	          if (response.msg_type === 'stream') {
	            host = response.content.text;
	          }
	          loadJuno(host);
	        }
	      }
	    }, { silent: false });
	  });
	}
	
	module.exports = {
	  load_ipython_extension: load_ipython_extension
	};

/***/ }
/******/ ])});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjAwZGU0NjhlMWYyMTRiNjFmMWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImxvYWRfaXB5dGhvbl9leHRlbnNpb24iLCJleHRlbnNpb25Mb2FkZWQiLCJsb2FkSnVubyIsImhvc3QiLCJzY3JpcHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFwcGVuZENoaWxkIiwicmVxdWlyZWpzIiwiSnVweXRlciIsIm5vdGVib29rIiwia2VybmVsIiwiZXhlY3V0ZSIsImlvcHViIiwib3V0cHV0IiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwibXNnX3R5cGUiLCJjb250ZW50IiwidGV4dCIsInNpbGVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsVUFBU0Esc0JBQVQsR0FBa0M7QUFDaEMsT0FBSUMsa0JBQWtCLEtBQXRCOztBQUVBLFlBQVNDLFFBQVQsQ0FBbUJDLElBQW5CLEVBQTBCO0FBQ3hCLFNBQUtGLGVBQUwsRUFBdUI7QUFBRTtBQUFTO0FBQ2xDLFNBQUlHLFNBQVNDLFNBQVNDLGFBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBRixZQUFPRyxHQUFQLEdBQWEsWUFBWUosSUFBWixHQUFtQixzQkFBaEM7QUFDQUUsY0FBU0csb0JBQVQsQ0FBK0IsTUFBL0IsRUFBd0MsQ0FBeEMsRUFBMkNDLFdBQTNDLENBQXdETCxNQUF4RDtBQUNEOztBQUVETSxhQUFXLENBQ1QsbUJBRFMsQ0FBWCxFQUVHLFVBQVVDLE9BQVYsRUFBb0I7QUFDckJBLGFBQVFDLFFBQVIsQ0FBaUJDLE1BQWpCLENBQXdCQyxPQUF4QixDQUFpQywwQ0FBakMsRUFBNkU7QUFDM0VDLGNBQU87QUFDTEMsaUJBQVEsZ0JBQVVDLFFBQVYsRUFBcUI7QUFDM0IsZUFBSWQsT0FBTyxnQkFBWDtBQUNBZSxtQkFBUUMsR0FBUixDQUFhRixRQUFiLEVBQXVCZCxJQUF2QjtBQUNBO0FBQ0E7QUFDQSxlQUFLYyxTQUFTRyxRQUFULEtBQXNCLFFBQTNCLEVBQXNDO0FBQ3BDakIsb0JBQU9jLFNBQVNJLE9BQVQsQ0FBaUJDLElBQXhCO0FBQ0Q7QUFDRHBCLG9CQUFVQyxJQUFWO0FBQ0Q7QUFWSTtBQURvRSxNQUE3RSxFQWFHLEVBQUVvQixRQUFRLEtBQVYsRUFiSDtBQWNELElBakJEO0FBa0JEOztBQUVEQyxRQUFPQyxPQUFQLEdBQWlCO0FBQ2Z6QiwyQkFBd0JBO0FBRFQsRUFBakIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGIwMGRlNDY4ZTFmMjE0YjYxZjFkIiwiZnVuY3Rpb24gbG9hZF9pcHl0aG9uX2V4dGVuc2lvbigpIHtcbiAgdmFyIGV4dGVuc2lvbkxvYWRlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGxvYWRKdW5vKCBob3N0ICkge1xuICAgIGlmICggZXh0ZW5zaW9uTG9hZGVkICkgeyByZXR1cm47IH1cbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NjcmlwdCcgKTtcbiAgICBzY3JpcHQuc3JjID0gJ2h0dHA6Ly8nICsgaG9zdCArICcvanVuby9uYmV4dGVuc2lvbi5qcyc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdoZWFkJyApWzBdLmFwcGVuZENoaWxkKCBzY3JpcHQgKTtcbiAgfVxuXG4gIHJlcXVpcmVqcyggW1xuICAgIFwiYmFzZS9qcy9uYW1lc3BhY2VcIlxuICBdLCBmdW5jdGlvbiggSnVweXRlciApIHtcbiAgICBKdXB5dGVyLm5vdGVib29rLmtlcm5lbC5leGVjdXRlKCBcImltcG9ydCBvc1xcbnByaW50IG9zLmVudmlyb25bJ0pVTk9fSE9TVCddXCIsIHtcbiAgICAgIGlvcHViOiB7XG4gICAgICAgIG91dHB1dDogZnVuY3Rpb24oIHJlc3BvbnNlICkge1xuICAgICAgICAgIHZhciBob3N0ID0gJ2xvY2FsaG9zdDozMDAwJztcbiAgICAgICAgICBjb25zb2xlLmxvZyggcmVzcG9uc2UsIGhvc3QgKVxuICAgICAgICAgIC8vdmFyIGhvc3QgPSAnZHJhbWEudGltYnIuaW8nO1xuICAgICAgICAgIC8vdmFyIGhvc3QgPSAnYXBwMC50aW1ici5pbyc7XG4gICAgICAgICAgaWYgKCByZXNwb25zZS5tc2dfdHlwZSA9PT0gJ3N0cmVhbScgKSB7XG4gICAgICAgICAgICBob3N0ID0gcmVzcG9uc2UuY29udGVudC50ZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2FkSnVubyggaG9zdCApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgeyBzaWxlbnQ6IGZhbHNlIH0gKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsb2FkX2lweXRob25fZXh0ZW5zaW9uOiBsb2FkX2lweXRob25fZXh0ZW5zaW9uXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==