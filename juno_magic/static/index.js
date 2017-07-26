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
	      handleKernel(data.kernel);
	    });
	  });
	}
	
	module.exports = {
	  load_ipython_extension: load_ipython_extension
	};

/***/ }
/******/ ])});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2UxMzk2OGZkNWE1MmE2MTUzOTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImxvYWRfaXB5dGhvbl9leHRlbnNpb24iLCJleHRlbnNpb25Mb2FkZWQiLCJsb2FkU2NyaXB0IiwiaG9zdCIsIm5hbWUiLCJzY3JpcHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJsb2FkSnVubyIsInJlcVJlYWN0Iiwid2luZG93IiwicmVxdWlyZWpzIiwiY29uZmlnIiwicGF0aHMiLCJKdXB5dGVyIiwiRXZlbnRzIiwibm90ZWJvb2siLCJrZXJuZWwiLCJsb2NhdGlvbiIsIm9uIiwiZXZlbnQiLCJkYXRhIiwiaGFuZGxlS2VybmVsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxVQUFTQSxzQkFBVCxHQUFrQzs7QUFFaEMsT0FBSUMsa0JBQWtCLEtBQXRCOztBQUVBLFlBQVNDLFVBQVQsQ0FBcUJDLElBQXJCLEVBQTJCQyxJQUEzQixFQUFrQztBQUNoQyxTQUFJQyxTQUFTQyxTQUFTQyxhQUFULENBQXdCLFFBQXhCLENBQWI7QUFDQUYsWUFBT0csR0FBUCxHQUFhSixPQUNURCxtQkFBZ0JDLElBQWhCLFNBRFMsR0FFVEQsSUFGSjtBQUdBRyxjQUFTRyxJQUFULENBQWNDLFdBQWQsQ0FBMkJMLE1BQTNCO0FBQ0EsWUFBT0EsTUFBUDtBQUNEOztBQUVELFlBQVNNLFFBQVQsQ0FBbUJSLElBQW5CLEVBQTBCO0FBQ3hCLFNBQUtGLGVBQUwsRUFBdUI7QUFBRTtBQUFTOztBQUVsQyxTQUFJVyxXQUFXQyxPQUFPQyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QjtBQUNyQ0MsY0FBTztBQUNMLGtCQUFTYixPQUFPLGFBRFg7QUFFTCxzQkFBYUEsT0FBTztBQUZmO0FBRDhCLE1BQXhCLENBQWY7O0FBT0FTLGNBQVMsQ0FBRSxPQUFGLEVBQVcsV0FBWCxDQUFULEVBQW1DLFlBQU07QUFDdkNBLGdCQUFTLENBQUVULE9BQU8saUJBQVQsQ0FBVCxFQUFzQyxZQUFNO0FBQzFDUyxrQkFBUyxDQUFFVCxPQUFPLHNCQUFULENBQVQsRUFBMkMsWUFBTSxDQUFFLENBQW5EO0FBQ0QsUUFGRDtBQUdELE1BSkQ7QUFLRDs7QUFFRFcsYUFBVyxDQUNULG1CQURTLEVBRVQsZ0JBRlMsQ0FBWCxFQUdHLFVBQVVHLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTRCO0FBQzdCO0FBQ0EsU0FBS0QsUUFBUUUsUUFBUixJQUFvQkYsUUFBUUUsUUFBUixDQUFpQkMsTUFBMUMsRUFBbUQ7QUFDakRULGdCQUFVLE9BQU9FLE9BQU9RLFFBQVAsQ0FBZ0JsQixJQUFqQztBQUNEO0FBQ0RlLFlBQU9JLEVBQVAsQ0FBVyw4Q0FBWCxFQUEyRCxVQUFFQyxLQUFGLEVBQVNDLElBQVQsRUFBbUI7QUFDNUVDLG9CQUFjRCxLQUFLSixNQUFuQjtBQUNELE1BRkQ7QUFHRCxJQVhEO0FBWUQ7O0FBRURNLFFBQU9DLE9BQVAsR0FBaUI7QUFDZjNCLDJCQUF3QkE7QUFEVCxFQUFqQixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2UxMzk2OGZkNWE1MmE2MTUzOTIiLCJmdW5jdGlvbiBsb2FkX2lweXRob25fZXh0ZW5zaW9uKCkge1xuXG4gIHZhciBleHRlbnNpb25Mb2FkZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBsb2FkU2NyaXB0KCBob3N0LCBuYW1lICkge1xuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc2NyaXB0JyApO1xuICAgIHNjcmlwdC5zcmMgPSBuYW1lXG4gICAgICA/IGhvc3QgKyBgL2p1bm8vJHtuYW1lfS5qc2BcbiAgICAgIDogaG9zdDtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKCBzY3JpcHQgKTtcbiAgICByZXR1cm4gc2NyaXB0O1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZEp1bm8oIGhvc3QgKSB7XG4gICAgaWYgKCBleHRlbnNpb25Mb2FkZWQgKSB7IHJldHVybjsgfVxuXG4gICAgdmFyIHJlcVJlYWN0ID0gd2luZG93LnJlcXVpcmVqcy5jb25maWcoe1xuICAgICAgcGF0aHM6IHtcbiAgICAgICAgJ3JlYWN0JzogaG9zdCArICcvanVuby9yZWFjdCcsXG4gICAgICAgICdyZWFjdC1kb20nOiBob3N0ICsgJy9qdW5vL3JlYWN0LWRvbSdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlcVJlYWN0KFsgJ3JlYWN0JywgJ3JlYWN0LWRvbScgXSwgKCkgPT4ge1xuICAgICAgcmVxUmVhY3QoWyBob3N0ICsgJy9qdW5vL3ZlbmRvci5qcyddLCAoKSA9PiB7XG4gICAgICAgIHJlcVJlYWN0KFsgaG9zdCArICcvanVuby9uYmV4dGVuc2lvbi5qcyddLCAoKSA9PiB7fSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlcXVpcmVqcyggW1xuICAgIFwiYmFzZS9qcy9uYW1lc3BhY2VcIixcbiAgICBcImJhc2UvanMvZXZlbnRzXCJcbiAgXSwgZnVuY3Rpb24oIEp1cHl0ZXIsIEV2ZW50cyApIHtcbiAgICAvLyBPbiBuZXcga2VybmVsIHNlc3Npb24gY3JlYXRlIG5ldyBjb21tIG1hbmFnZXJzXG4gICAgaWYgKCBKdXB5dGVyLm5vdGVib29rICYmIEp1cHl0ZXIubm90ZWJvb2sua2VybmVsICkge1xuICAgICAgbG9hZEp1bm8oICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdCApXG4gICAgfVxuICAgIEV2ZW50cy5vbiggJ2tlcm5lbF9jcmVhdGVkLktlcm5lbCBrZXJuZWxfY3JlYXRlZC5TZXNzaW9uJywgKCBldmVudCwgZGF0YSApID0+IHtcbiAgICAgIGhhbmRsZUtlcm5lbCggZGF0YS5rZXJuZWwgKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsb2FkX2lweXRob25fZXh0ZW5zaW9uOiBsb2FkX2lweXRob25fZXh0ZW5zaW9uXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==