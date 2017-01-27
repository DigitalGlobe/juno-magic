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
	    script.src = host + ('/juno/' + name + '.js');
	    document.head.appendChild(script);
	    return script;
	  }
	
	  function loadJuno(host) {
	    if (extensionLoaded) {
	      return;
	    }
	    loadScript(host, 'vendor').onload = function () {
	      return loadScript(host, 'nbextension');
	    };
	  }
	
	  function handleKernel(kernel) {
	    kernel.execute("import os\nprint os.environ['JUNO_HOST']", {
	      iopub: {
	        output: function output(response) {
	          var host = 'http://localhost:3000';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzYyMDQ3ZTI4MDE5ZTEwMTU5ZjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImxvYWRfaXB5dGhvbl9leHRlbnNpb24iLCJleHRlbnNpb25Mb2FkZWQiLCJsb2FkU2NyaXB0IiwiaG9zdCIsIm5hbWUiLCJzY3JpcHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJsb2FkSnVubyIsIm9ubG9hZCIsImhhbmRsZUtlcm5lbCIsImtlcm5lbCIsImV4ZWN1dGUiLCJpb3B1YiIsIm91dHB1dCIsInJlc3BvbnNlIiwibXNnX3R5cGUiLCJjb250ZW50IiwidGV4dCIsInNpbGVudCIsInJlcXVpcmVqcyIsIkp1cHl0ZXIiLCJFdmVudHMiLCJub3RlYm9vayIsIm9uIiwiZXZlbnQiLCJkYXRhIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxVQUFTQSxzQkFBVCxHQUFrQztBQUNoQyxPQUFJQyxrQkFBa0IsS0FBdEI7O0FBRUEsWUFBU0MsVUFBVCxDQUFxQkMsSUFBckIsRUFBMkJDLElBQTNCLEVBQWtDO0FBQ2hDLFNBQUlDLFNBQVNDLFNBQVNDLGFBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBRixZQUFPRyxHQUFQLEdBQWFMLG1CQUFnQkMsSUFBaEIsU0FBYjtBQUNBRSxjQUFTRyxJQUFULENBQWNDLFdBQWQsQ0FBMkJMLE1BQTNCO0FBQ0EsWUFBT0EsTUFBUDtBQUNEOztBQUVELFlBQVNNLFFBQVQsQ0FBbUJSLElBQW5CLEVBQTBCO0FBQ3hCLFNBQUtGLGVBQUwsRUFBdUI7QUFBRTtBQUFTO0FBQ2xDQyxnQkFBWUMsSUFBWixFQUFrQixRQUFsQixFQUNHUyxNQURILEdBQ1k7QUFBQSxjQUFNVixXQUFZQyxJQUFaLEVBQWtCLGFBQWxCLENBQU47QUFBQSxNQURaO0FBRUQ7O0FBRUQsWUFBU1UsWUFBVCxDQUF1QkMsTUFBdkIsRUFBZ0M7QUFDOUJBLFlBQU9DLE9BQVAsQ0FBZ0IsMENBQWhCLEVBQTREO0FBQzFEQyxjQUFPO0FBQ0xDLGlCQUFRLGdCQUFVQyxRQUFWLEVBQXFCO0FBQzNCLGVBQUlmLE9BQU8sdUJBQVg7QUFDQTtBQUNBO0FBQ0EsZUFBS2UsU0FBU0MsUUFBVCxLQUFzQixRQUEzQixFQUFzQztBQUNwQ2hCLG9CQUFPZSxTQUFTRSxPQUFULENBQWlCQyxJQUF4QjtBQUNEO0FBQ0RWLG9CQUFVUixJQUFWO0FBQ0Q7QUFUSTtBQURtRCxNQUE1RCxFQVlHLEVBQUVtQixRQUFRLEtBQVYsRUFaSDtBQWFEOztBQUVEQyxhQUFXLENBQ1QsbUJBRFMsRUFFVCxnQkFGUyxDQUFYLEVBR0csVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBNEI7QUFDN0I7QUFDQSxTQUFLRCxRQUFRRSxRQUFSLElBQW9CRixRQUFRRSxRQUFSLENBQWlCWixNQUExQyxFQUFtRDtBQUNqREQsb0JBQWNXLFFBQVFFLFFBQVIsQ0FBaUJaLE1BQS9CO0FBQ0Q7QUFDRFcsWUFBT0UsRUFBUCxDQUFXLDhDQUFYLEVBQTJELFVBQUVDLEtBQUYsRUFBU0MsSUFBVCxFQUFtQjtBQUM1RWhCLG9CQUFjZ0IsS0FBS2YsTUFBbkI7QUFDRCxNQUZEO0FBR0QsSUFYRDtBQVlEOztBQUVEZ0IsUUFBT0MsT0FBUCxHQUFpQjtBQUNmL0IsMkJBQXdCQTtBQURULEVBQWpCLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNjIwNDdlMjgwMTllMTAxNTlmNCIsImZ1bmN0aW9uIGxvYWRfaXB5dGhvbl9leHRlbnNpb24oKSB7XG4gIHZhciBleHRlbnNpb25Mb2FkZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBsb2FkU2NyaXB0KCBob3N0LCBuYW1lICkge1xuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc2NyaXB0JyApO1xuICAgIHNjcmlwdC5zcmMgPSBob3N0ICsgYC9qdW5vLyR7bmFtZX0uanNgO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdCApO1xuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkSnVubyggaG9zdCApIHtcbiAgICBpZiAoIGV4dGVuc2lvbkxvYWRlZCApIHsgcmV0dXJuOyB9XG4gICAgbG9hZFNjcmlwdCggaG9zdCwgJ3ZlbmRvcicgKVxuICAgICAgLm9ubG9hZCA9ICgpID0+IGxvYWRTY3JpcHQoIGhvc3QsICduYmV4dGVuc2lvbicgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUtlcm5lbCgga2VybmVsICkge1xuICAgIGtlcm5lbC5leGVjdXRlKCBcImltcG9ydCBvc1xcbnByaW50IG9zLmVudmlyb25bJ0pVTk9fSE9TVCddXCIsIHtcbiAgICAgIGlvcHViOiB7XG4gICAgICAgIG91dHB1dDogZnVuY3Rpb24oIHJlc3BvbnNlICkge1xuICAgICAgICAgIHZhciBob3N0ID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCc7XG4gICAgICAgICAgLy92YXIgaG9zdCA9ICdkcmFtYS50aW1ici5pbyc7XG4gICAgICAgICAgLy92YXIgaG9zdCA9ICdhcHAwLnRpbWJyLmlvJztcbiAgICAgICAgICBpZiAoIHJlc3BvbnNlLm1zZ190eXBlID09PSAnc3RyZWFtJyApIHtcbiAgICAgICAgICAgIGhvc3QgPSByZXNwb25zZS5jb250ZW50LnRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvYWRKdW5vKCBob3N0ICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7IHNpbGVudDogZmFsc2UgfSApOyBcbiAgfVxuXG4gIHJlcXVpcmVqcyggW1xuICAgIFwiYmFzZS9qcy9uYW1lc3BhY2VcIixcbiAgICBcImJhc2UvanMvZXZlbnRzXCJcbiAgXSwgZnVuY3Rpb24oIEp1cHl0ZXIsIEV2ZW50cyApIHtcbiAgICAvLyBPbiBuZXcga2VybmVsIHNlc3Npb24gY3JlYXRlIG5ldyBjb21tIG1hbmFnZXJzXG4gICAgaWYgKCBKdXB5dGVyLm5vdGVib29rICYmIEp1cHl0ZXIubm90ZWJvb2sua2VybmVsICkge1xuICAgICAgaGFuZGxlS2VybmVsKCBKdXB5dGVyLm5vdGVib29rLmtlcm5lbCApO1xuICAgIH1cbiAgICBFdmVudHMub24oICdrZXJuZWxfY3JlYXRlZC5LZXJuZWwga2VybmVsX2NyZWF0ZWQuU2Vzc2lvbicsICggZXZlbnQsIGRhdGEgKSA9PiB7XG4gICAgICBoYW5kbGVLZXJuZWwoIGRhdGEua2VybmVsICk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbG9hZF9pcHl0aG9uX2V4dGVuc2lvbjogbG9hZF9pcHl0aG9uX2V4dGVuc2lvblxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=