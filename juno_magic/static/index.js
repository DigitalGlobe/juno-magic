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
	  var reqReact = window.requirejs.config({
	    paths: {
	      'react': 'https://unpkg.com/react@15/dist/react',
	      'react-dom': 'https://unpkg.com/react-dom@15/dist/react-dom'
	    }
	  });
	
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
	    reqReact(['react', 'react-dom'], function (React, ReactDOM) {
	      reqReact([host + '/juno/vendor.js'], function () {
	        reqReact([host + '/juno/nbextension.js'], function () {});
	      });
	    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODFiMGNiYjNlMzUwNmQ3MTRiYzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImxvYWRfaXB5dGhvbl9leHRlbnNpb24iLCJleHRlbnNpb25Mb2FkZWQiLCJyZXFSZWFjdCIsIndpbmRvdyIsInJlcXVpcmVqcyIsImNvbmZpZyIsInBhdGhzIiwibG9hZFNjcmlwdCIsImhvc3QiLCJuYW1lIiwic2NyaXB0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibG9hZEp1bm8iLCJSZWFjdCIsIlJlYWN0RE9NIiwiaGFuZGxlS2VybmVsIiwia2VybmVsIiwiZXhlY3V0ZSIsImlvcHViIiwib3V0cHV0IiwicmVzcG9uc2UiLCJtc2dfdHlwZSIsImNvbnRlbnQiLCJ0ZXh0Iiwic2lsZW50IiwiSnVweXRlciIsIkV2ZW50cyIsIm5vdGVib29rIiwib24iLCJldmVudCIsImRhdGEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLFVBQVNBLHNCQUFULEdBQWtDO0FBQ2hDLE9BQUlDLGtCQUFrQixLQUF0QjtBQUNBLE9BQUlDLFdBQVdDLE9BQU9DLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3JDQyxZQUFPO0FBQ0wsZ0JBQVMsdUNBREo7QUFFTCxvQkFBYTtBQUZSO0FBRDhCLElBQXhCLENBQWY7O0FBT0EsWUFBU0MsVUFBVCxDQUFxQkMsSUFBckIsRUFBMkJDLElBQTNCLEVBQWtDO0FBQ2hDLFNBQUlDLFNBQVNDLFNBQVNDLGFBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBRixZQUFPRyxHQUFQLEdBQWFKLE9BQ1RELG1CQUFnQkMsSUFBaEIsU0FEUyxHQUVURCxJQUZKO0FBR0FHLGNBQVNHLElBQVQsQ0FBY0MsV0FBZCxDQUEyQkwsTUFBM0I7QUFDQSxZQUFPQSxNQUFQO0FBQ0Q7O0FBRUQsWUFBU00sUUFBVCxDQUFtQlIsSUFBbkIsRUFBMEI7QUFDeEIsU0FBS1AsZUFBTCxFQUF1QjtBQUFFO0FBQVM7QUFDbENDLGNBQVMsQ0FBRSxPQUFGLEVBQVcsV0FBWCxDQUFULEVBQW1DLFVBQUVlLEtBQUYsRUFBU0MsUUFBVCxFQUF1QjtBQUN4RGhCLGdCQUFTLENBQUVNLE9BQU8saUJBQVQsQ0FBVCxFQUFzQyxZQUFNO0FBQzFDTixrQkFBUyxDQUFFTSxPQUFPLHNCQUFULENBQVQsRUFBMkMsWUFBTSxDQUFFLENBQW5EO0FBQ0QsUUFGRDtBQUdELE1BSkQ7QUFLRDs7QUFFRCxZQUFTVyxZQUFULENBQXVCQyxNQUF2QixFQUFnQztBQUM5QkEsWUFBT0MsT0FBUCxDQUFnQiwwQ0FBaEIsRUFBNEQ7QUFDMURDLGNBQU87QUFDTEMsaUJBQVEsZ0JBQVVDLFFBQVYsRUFBcUI7QUFDM0IsZUFBSWhCLE9BQU8sdUJBQVg7QUFDQTtBQUNBO0FBQ0EsZUFBS2dCLFNBQVNDLFFBQVQsS0FBc0IsUUFBM0IsRUFBc0M7QUFDcENqQixvQkFBT2dCLFNBQVNFLE9BQVQsQ0FBaUJDLElBQXhCO0FBQ0Q7QUFDRFgsb0JBQVVSLElBQVY7QUFDRDtBQVRJO0FBRG1ELE1BQTVELEVBWUcsRUFBRW9CLFFBQVEsS0FBVixFQVpIO0FBYUQ7O0FBRUR4QixhQUFXLENBQ1QsbUJBRFMsRUFFVCxnQkFGUyxDQUFYLEVBR0csVUFBVXlCLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTRCO0FBQzdCO0FBQ0EsU0FBS0QsUUFBUUUsUUFBUixJQUFvQkYsUUFBUUUsUUFBUixDQUFpQlgsTUFBMUMsRUFBbUQ7QUFDakRELG9CQUFjVSxRQUFRRSxRQUFSLENBQWlCWCxNQUEvQjtBQUNEO0FBQ0RVLFlBQU9FLEVBQVAsQ0FBVyw4Q0FBWCxFQUEyRCxVQUFFQyxLQUFGLEVBQVNDLElBQVQsRUFBbUI7QUFDNUVmLG9CQUFjZSxLQUFLZCxNQUFuQjtBQUNELE1BRkQ7QUFHRCxJQVhEO0FBWUQ7O0FBRURlLFFBQU9DLE9BQVAsR0FBaUI7QUFDZnBDLDJCQUF3QkE7QUFEVCxFQUFqQixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODFiMGNiYjNlMzUwNmQ3MTRiYzgiLCJmdW5jdGlvbiBsb2FkX2lweXRob25fZXh0ZW5zaW9uKCkge1xuICB2YXIgZXh0ZW5zaW9uTG9hZGVkID0gZmFsc2U7XG4gIHZhciByZXFSZWFjdCA9IHdpbmRvdy5yZXF1aXJlanMuY29uZmlnKHtcbiAgICBwYXRoczoge1xuICAgICAgJ3JlYWN0JzogJ2h0dHBzOi8vdW5wa2cuY29tL3JlYWN0QDE1L2Rpc3QvcmVhY3QnLFxuICAgICAgJ3JlYWN0LWRvbSc6ICdodHRwczovL3VucGtnLmNvbS9yZWFjdC1kb21AMTUvZGlzdC9yZWFjdC1kb20nXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIGxvYWRTY3JpcHQoIGhvc3QsIG5hbWUgKSB7XG4gICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzY3JpcHQnICk7XG4gICAgc2NyaXB0LnNyYyA9IG5hbWVcbiAgICAgID8gaG9zdCArIGAvanVuby8ke25hbWV9LmpzYFxuICAgICAgOiBob3N0O1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdCApO1xuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkSnVubyggaG9zdCApIHtcbiAgICBpZiAoIGV4dGVuc2lvbkxvYWRlZCApIHsgcmV0dXJuOyB9XG4gICAgcmVxUmVhY3QoWyAncmVhY3QnLCAncmVhY3QtZG9tJyBdLCAoIFJlYWN0LCBSZWFjdERPTSApID0+IHtcbiAgICAgIHJlcVJlYWN0KFsgaG9zdCArICcvanVuby92ZW5kb3IuanMnXSwgKCkgPT4ge1xuICAgICAgICByZXFSZWFjdChbIGhvc3QgKyAnL2p1bm8vbmJleHRlbnNpb24uanMnXSwgKCkgPT4ge30pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVLZXJuZWwoIGtlcm5lbCApIHtcbiAgICBrZXJuZWwuZXhlY3V0ZSggXCJpbXBvcnQgb3NcXG5wcmludCBvcy5lbnZpcm9uWydKVU5PX0hPU1QnXVwiLCB7XG4gICAgICBpb3B1Yjoge1xuICAgICAgICBvdXRwdXQ6IGZ1bmN0aW9uKCByZXNwb25zZSApIHtcbiAgICAgICAgICB2YXIgaG9zdCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnO1xuICAgICAgICAgIC8vdmFyIGhvc3QgPSAnZHJhbWEudGltYnIuaW8nO1xuICAgICAgICAgIC8vdmFyIGhvc3QgPSAnYXBwMC50aW1ici5pbyc7XG4gICAgICAgICAgaWYgKCByZXNwb25zZS5tc2dfdHlwZSA9PT0gJ3N0cmVhbScgKSB7XG4gICAgICAgICAgICBob3N0ID0gcmVzcG9uc2UuY29udGVudC50ZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2FkSnVubyggaG9zdCApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgeyBzaWxlbnQ6IGZhbHNlIH0gKTsgXG4gIH1cblxuICByZXF1aXJlanMoIFtcbiAgICBcImJhc2UvanMvbmFtZXNwYWNlXCIsXG4gICAgXCJiYXNlL2pzL2V2ZW50c1wiXG4gIF0sIGZ1bmN0aW9uKCBKdXB5dGVyLCBFdmVudHMgKSB7XG4gICAgLy8gT24gbmV3IGtlcm5lbCBzZXNzaW9uIGNyZWF0ZSBuZXcgY29tbSBtYW5hZ2Vyc1xuICAgIGlmICggSnVweXRlci5ub3RlYm9vayAmJiBKdXB5dGVyLm5vdGVib29rLmtlcm5lbCApIHtcbiAgICAgIGhhbmRsZUtlcm5lbCggSnVweXRlci5ub3RlYm9vay5rZXJuZWwgKTtcbiAgICB9XG4gICAgRXZlbnRzLm9uKCAna2VybmVsX2NyZWF0ZWQuS2VybmVsIGtlcm5lbF9jcmVhdGVkLlNlc3Npb24nLCAoIGV2ZW50LCBkYXRhICkgPT4ge1xuICAgICAgaGFuZGxlS2VybmVsKCBkYXRhLmtlcm5lbCApO1xuICAgIH0pO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxvYWRfaXB5dGhvbl9leHRlbnNpb246IGxvYWRfaXB5dGhvbl9leHRlbnNpb25cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9