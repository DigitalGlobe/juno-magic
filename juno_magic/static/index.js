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
	
	  function loadScript(host, name) {
	    var script = document.createElement('script');
	    script.src = name ? host + ('/juno/' + name + '.js') : host;
	    document.head.appendChild(script);
	    return script;
	  }
	
	  function loadJuno(host) {
	    if (extensionLoaded) {
	      return;
	    }
	
	    var reqReact = window.requirejs.config({
	      paths: {
	        'react': host + '/juno/react',
	        'react-dom': host + '/juno/react-dom'
	      }
	    });
	
	    reqReact(['react', 'react-dom'], function () {
	      reqReact([host + '/juno/vendor.js'], function () {
	        reqReact([host + '/juno/nbextension.js'], function () {});
	      });
	    });
	  }
	
	  requirejs(["base/js/namespace", "base/js/events"], function (Jupyter, Events) {
	    // On new kernel session create new comm managers
	    if (Jupyter.notebook && Jupyter.notebook.kernel) {
	      loadJuno('//' + window.location.host);
	    }
	    Events.on('kernel_created.Kernel kernel_created.Session', function (event, data) {
	      loadJuno('//' + window.location.host);
	    });
	  });
	}
	
	module.exports = {
	  load_ipython_extension: load_ipython_extension
	};

/***/ }
/******/ ])});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjMxZTE1MjU0ZjYyYmJlN2FmZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImxvYWRfaXB5dGhvbl9leHRlbnNpb24iLCJleHRlbnNpb25Mb2FkZWQiLCJsb2FkU2NyaXB0IiwiaG9zdCIsIm5hbWUiLCJzY3JpcHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJsb2FkSnVubyIsInJlcVJlYWN0Iiwid2luZG93IiwicmVxdWlyZWpzIiwiY29uZmlnIiwicGF0aHMiLCJKdXB5dGVyIiwiRXZlbnRzIiwibm90ZWJvb2siLCJrZXJuZWwiLCJsb2NhdGlvbiIsIm9uIiwiZXZlbnQiLCJkYXRhIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxVQUFTQSxzQkFBVCxHQUFrQzs7QUFFaEMsT0FBSUMsa0JBQWtCLEtBQXRCOztBQUVBLFlBQVNDLFVBQVQsQ0FBcUJDLElBQXJCLEVBQTJCQyxJQUEzQixFQUFrQztBQUNoQyxTQUFJQyxTQUFTQyxTQUFTQyxhQUFULENBQXdCLFFBQXhCLENBQWI7QUFDQUYsWUFBT0csR0FBUCxHQUFhSixPQUNURCxtQkFBZ0JDLElBQWhCLFNBRFMsR0FFVEQsSUFGSjtBQUdBRyxjQUFTRyxJQUFULENBQWNDLFdBQWQsQ0FBMkJMLE1BQTNCO0FBQ0EsWUFBT0EsTUFBUDtBQUNEOztBQUVELFlBQVNNLFFBQVQsQ0FBbUJSLElBQW5CLEVBQTBCO0FBQ3hCLFNBQUtGLGVBQUwsRUFBdUI7QUFBRTtBQUFTOztBQUVsQyxTQUFJVyxXQUFXQyxPQUFPQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNyQ0MsY0FBTztBQUNMLGtCQUFTYixPQUFPLGFBRFg7QUFFTCxzQkFBYUEsT0FBTztBQUZmO0FBRDhCLE1BQXhCLENBQWY7O0FBT0FTLGNBQVMsQ0FBRSxPQUFGLEVBQVcsV0FBWCxDQUFULEVBQW1DLFlBQU07QUFDdkNBLGdCQUFTLENBQUVULE9BQU8saUJBQVQsQ0FBVCxFQUFzQyxZQUFNO0FBQzFDUyxrQkFBUyxDQUFFVCxPQUFPLHNCQUFULENBQVQsRUFBMkMsWUFBTSxDQUFFLENBQW5EO0FBQ0QsUUFGRDtBQUdELE1BSkQ7QUFLRDs7QUFFRFcsYUFBVyxDQUNULG1CQURTLEVBRVQsZ0JBRlMsQ0FBWCxFQUdHLFVBQVVHLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTRCO0FBQzdCO0FBQ0EsU0FBS0QsUUFBUUUsUUFBUixJQUFvQkYsUUFBUUUsUUFBUixDQUFpQkMsTUFBMUMsRUFBbUQ7QUFDakRULGdCQUFVLE9BQU9FLE9BQU9RLFFBQVAsQ0FBZ0JsQixJQUFqQztBQUNEO0FBQ0RlLFlBQU9JLEVBQVAsQ0FBVyw4Q0FBWCxFQUEyRCxVQUFFQyxLQUFGLEVBQVNDLElBQVQsRUFBbUI7QUFDNUViLGdCQUFVLE9BQU9FLE9BQU9RLFFBQVAsQ0FBZ0JsQixJQUFqQztBQUNELE1BRkQ7QUFHRCxJQVhEO0FBWUQ7O0FBRURzQixRQUFPQyxPQUFQLEdBQWlCO0FBQ2YxQiwyQkFBd0JBO0FBRFQsRUFBakIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGIzMWUxNTI1NGY2MmJiZTdhZmY2IiwiZnVuY3Rpb24gbG9hZF9pcHl0aG9uX2V4dGVuc2lvbigpIHtcblxuICB2YXIgZXh0ZW5zaW9uTG9hZGVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gbG9hZFNjcmlwdCggaG9zdCwgbmFtZSApIHtcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NjcmlwdCcgKTtcbiAgICBzY3JpcHQuc3JjID0gbmFtZVxuICAgICAgPyBob3N0ICsgYC9qdW5vLyR7bmFtZX0uanNgXG4gICAgICA6IGhvc3Q7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCggc2NyaXB0ICk7XG4gICAgcmV0dXJuIHNjcmlwdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRKdW5vKCBob3N0ICkge1xuICAgIGlmICggZXh0ZW5zaW9uTG9hZGVkICkgeyByZXR1cm47IH1cblxuICAgIHZhciByZXFSZWFjdCA9IHdpbmRvdy5yZXF1aXJlanMuY29uZmlnKHtcbiAgICAgIHBhdGhzOiB7XG4gICAgICAgICdyZWFjdCc6IGhvc3QgKyAnL2p1bm8vcmVhY3QnLFxuICAgICAgICAncmVhY3QtZG9tJzogaG9zdCArICcvanVuby9yZWFjdC1kb20nXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXFSZWFjdChbICdyZWFjdCcsICdyZWFjdC1kb20nIF0sICgpID0+IHtcbiAgICAgIHJlcVJlYWN0KFsgaG9zdCArICcvanVuby92ZW5kb3IuanMnXSwgKCkgPT4ge1xuICAgICAgICByZXFSZWFjdChbIGhvc3QgKyAnL2p1bm8vbmJleHRlbnNpb24uanMnXSwgKCkgPT4ge30pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXF1aXJlanMoIFtcbiAgICBcImJhc2UvanMvbmFtZXNwYWNlXCIsXG4gICAgXCJiYXNlL2pzL2V2ZW50c1wiXG4gIF0sIGZ1bmN0aW9uKCBKdXB5dGVyLCBFdmVudHMgKSB7XG4gICAgLy8gT24gbmV3IGtlcm5lbCBzZXNzaW9uIGNyZWF0ZSBuZXcgY29tbSBtYW5hZ2Vyc1xuICAgIGlmICggSnVweXRlci5ub3RlYm9vayAmJiBKdXB5dGVyLm5vdGVib29rLmtlcm5lbCApIHtcbiAgICAgIGxvYWRKdW5vKCAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKVxuICAgIH1cbiAgICBFdmVudHMub24oICdrZXJuZWxfY3JlYXRlZC5LZXJuZWwga2VybmVsX2NyZWF0ZWQuU2Vzc2lvbicsICggZXZlbnQsIGRhdGEgKSA9PiB7XG4gICAgICBsb2FkSnVubyggJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbG9hZF9pcHl0aG9uX2V4dGVuc2lvbjogbG9hZF9pcHl0aG9uX2V4dGVuc2lvblxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=