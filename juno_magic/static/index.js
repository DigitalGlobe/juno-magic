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
	
	  function handleKernel(kernel) {
	    kernel.execute("import os\nprint os.environ['JUNO_HOST']", {
	      iopub: {
	        output: function output(response) {
	          var host = 'localhost:3000';
	          //var host = 'drama.timbr.io';
	          //var host = 'app0.timbr.io';
	          if (response.msg_type === 'stream') {
	            host = response.content.text;
	          }
	          loadJuno(host);
	        }
	      }
	    }, { silent: false });
	  }
	
	  requirejs(["base/js/namespace", "base/js/events"], function (Jupyter, Events) {
	    // On new kernel session create new comm managers
	    if (Jupyter.notebook && Jupyter.notebook.kernel) {
	      handleKernel(Jupyter.notebook.kernel);
	    }
	    Events.on('kernel_created.Kernel kernel_created.Session', function (event, data) {
	      handleKernel(data.kernel);
	    });
	  });
	}
	
	module.exports = {
	  load_ipython_extension: load_ipython_extension
	};

/***/ }
/******/ ])});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjZlNzNiNzU3Mzc0ZjUxMjBjNWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImxvYWRfaXB5dGhvbl9leHRlbnNpb24iLCJleHRlbnNpb25Mb2FkZWQiLCJsb2FkSnVubyIsImhvc3QiLCJzY3JpcHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFwcGVuZENoaWxkIiwiaGFuZGxlS2VybmVsIiwia2VybmVsIiwiZXhlY3V0ZSIsImlvcHViIiwib3V0cHV0IiwicmVzcG9uc2UiLCJtc2dfdHlwZSIsImNvbnRlbnQiLCJ0ZXh0Iiwic2lsZW50IiwicmVxdWlyZWpzIiwiSnVweXRlciIsIkV2ZW50cyIsIm5vdGVib29rIiwib24iLCJldmVudCIsImRhdGEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLFVBQVNBLHNCQUFULEdBQWtDO0FBQ2hDLE9BQUlDLGtCQUFrQixLQUF0Qjs7QUFFQSxZQUFTQyxRQUFULENBQW1CQyxJQUFuQixFQUEwQjtBQUN4QixTQUFLRixlQUFMLEVBQXVCO0FBQUU7QUFBUztBQUNsQyxTQUFJRyxTQUFTQyxTQUFTQyxhQUFULENBQXdCLFFBQXhCLENBQWI7QUFDQUYsWUFBT0csR0FBUCxHQUFhLFlBQVlKLElBQVosR0FBbUIsc0JBQWhDO0FBQ0FFLGNBQVNHLG9CQUFULENBQStCLE1BQS9CLEVBQXdDLENBQXhDLEVBQTJDQyxXQUEzQyxDQUF3REwsTUFBeEQ7QUFDRDs7QUFFRCxZQUFTTSxZQUFULENBQXVCQyxNQUF2QixFQUFnQztBQUM5QkEsWUFBT0MsT0FBUCxDQUFnQiwwQ0FBaEIsRUFBNEQ7QUFDMURDLGNBQU87QUFDTEMsaUJBQVEsZ0JBQVVDLFFBQVYsRUFBcUI7QUFDM0IsZUFBSVosT0FBTyxnQkFBWDtBQUNBO0FBQ0E7QUFDQSxlQUFLWSxTQUFTQyxRQUFULEtBQXNCLFFBQTNCLEVBQXNDO0FBQ3BDYixvQkFBT1ksU0FBU0UsT0FBVCxDQUFpQkMsSUFBeEI7QUFDRDtBQUNEaEIsb0JBQVVDLElBQVY7QUFDRDtBQVRJO0FBRG1ELE1BQTVELEVBWUcsRUFBRWdCLFFBQVEsS0FBVixFQVpIO0FBYUQ7O0FBRURDLGFBQVcsQ0FDVCxtQkFEUyxFQUVULGdCQUZTLENBQVgsRUFHRyxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUE0QjtBQUM3QjtBQUNBLFNBQUtELFFBQVFFLFFBQVIsSUFBb0JGLFFBQVFFLFFBQVIsQ0FBaUJaLE1BQTFDLEVBQW1EO0FBQ2pERCxvQkFBY1csUUFBUUUsUUFBUixDQUFpQlosTUFBL0I7QUFDRDtBQUNEVyxZQUFPRSxFQUFQLENBQVcsOENBQVgsRUFBMkQsVUFBRUMsS0FBRixFQUFTQyxJQUFULEVBQW1CO0FBQzVFaEIsb0JBQWNnQixLQUFLZixNQUFuQjtBQUNELE1BRkQ7QUFHRCxJQVhEO0FBWUQ7O0FBRURnQixRQUFPQyxPQUFQLEdBQWlCO0FBQ2Y1QiwyQkFBd0JBO0FBRFQsRUFBakIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY2ZTczYjc1NzM3NGY1MTIwYzVjIiwiZnVuY3Rpb24gbG9hZF9pcHl0aG9uX2V4dGVuc2lvbigpIHtcbiAgdmFyIGV4dGVuc2lvbkxvYWRlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGxvYWRKdW5vKCBob3N0ICkge1xuICAgIGlmICggZXh0ZW5zaW9uTG9hZGVkICkgeyByZXR1cm47IH1cbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NjcmlwdCcgKTtcbiAgICBzY3JpcHQuc3JjID0gJ2h0dHA6Ly8nICsgaG9zdCArICcvanVuby9uYmV4dGVuc2lvbi5qcyc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdoZWFkJyApWzBdLmFwcGVuZENoaWxkKCBzY3JpcHQgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUtlcm5lbCgga2VybmVsICkge1xuICAgIGtlcm5lbC5leGVjdXRlKCBcImltcG9ydCBvc1xcbnByaW50IG9zLmVudmlyb25bJ0pVTk9fSE9TVCddXCIsIHtcbiAgICAgIGlvcHViOiB7XG4gICAgICAgIG91dHB1dDogZnVuY3Rpb24oIHJlc3BvbnNlICkge1xuICAgICAgICAgIHZhciBob3N0ID0gJ2xvY2FsaG9zdDozMDAwJztcbiAgICAgICAgICAvL3ZhciBob3N0ID0gJ2RyYW1hLnRpbWJyLmlvJztcbiAgICAgICAgICAvL3ZhciBob3N0ID0gJ2FwcDAudGltYnIuaW8nO1xuICAgICAgICAgIGlmICggcmVzcG9uc2UubXNnX3R5cGUgPT09ICdzdHJlYW0nICkge1xuICAgICAgICAgICAgaG9zdCA9IHJlc3BvbnNlLmNvbnRlbnQudGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9hZEp1bm8oIGhvc3QgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHsgc2lsZW50OiBmYWxzZSB9ICk7IFxuICB9XG5cbiAgcmVxdWlyZWpzKCBbXG4gICAgXCJiYXNlL2pzL25hbWVzcGFjZVwiLFxuICAgIFwiYmFzZS9qcy9ldmVudHNcIlxuICBdLCBmdW5jdGlvbiggSnVweXRlciwgRXZlbnRzICkge1xuICAgIC8vIE9uIG5ldyBrZXJuZWwgc2Vzc2lvbiBjcmVhdGUgbmV3IGNvbW0gbWFuYWdlcnNcbiAgICBpZiAoIEp1cHl0ZXIubm90ZWJvb2sgJiYgSnVweXRlci5ub3RlYm9vay5rZXJuZWwgKSB7XG4gICAgICBoYW5kbGVLZXJuZWwoIEp1cHl0ZXIubm90ZWJvb2sua2VybmVsICk7XG4gICAgfVxuICAgIEV2ZW50cy5vbiggJ2tlcm5lbF9jcmVhdGVkLktlcm5lbCBrZXJuZWxfY3JlYXRlZC5TZXNzaW9uJywgKCBldmVudCwgZGF0YSApID0+IHtcbiAgICAgIGhhbmRsZUtlcm5lbCggZGF0YS5rZXJuZWwgKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsb2FkX2lweXRob25fZXh0ZW5zaW9uOiBsb2FkX2lweXRob25fZXh0ZW5zaW9uXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==