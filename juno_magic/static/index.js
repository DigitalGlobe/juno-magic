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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDQzNDk5MTE3ODZhMWE3NjhmYTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImxvYWRfaXB5dGhvbl9leHRlbnNpb24iLCJleHRlbnNpb25Mb2FkZWQiLCJsb2FkU2NyaXB0IiwiaG9zdCIsIm5hbWUiLCJzY3JpcHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJsb2FkSnVubyIsInJlcVJlYWN0Iiwid2luZG93IiwicmVxdWlyZWpzIiwiY29uZmlnIiwicGF0aHMiLCJoYW5kbGVLZXJuZWwiLCJrZXJuZWwiLCJleGVjdXRlIiwiaW9wdWIiLCJvdXRwdXQiLCJyZXNwb25zZSIsIm1zZ190eXBlIiwiY29udGVudCIsInRleHQiLCJzaWxlbnQiLCJKdXB5dGVyIiwiRXZlbnRzIiwibm90ZWJvb2siLCJvbiIsImV2ZW50IiwiZGF0YSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsVUFBU0Esc0JBQVQsR0FBa0M7O0FBRWhDLE9BQUlDLGtCQUFrQixLQUF0Qjs7QUFFQSxZQUFTQyxVQUFULENBQXFCQyxJQUFyQixFQUEyQkMsSUFBM0IsRUFBa0M7QUFDaEMsU0FBSUMsU0FBU0MsU0FBU0MsYUFBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0FGLFlBQU9HLEdBQVAsR0FBYUosT0FDVEQsbUJBQWdCQyxJQUFoQixTQURTLEdBRVRELElBRko7QUFHQUcsY0FBU0csSUFBVCxDQUFjQyxXQUFkLENBQTJCTCxNQUEzQjtBQUNBLFlBQU9BLE1BQVA7QUFDRDs7QUFFRCxZQUFTTSxRQUFULENBQW1CUixJQUFuQixFQUEwQjtBQUN4QixTQUFLRixlQUFMLEVBQXVCO0FBQUU7QUFBUzs7QUFFbEMsU0FBSVcsV0FBV0MsT0FBT0MsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFDckNDLGNBQU87QUFDTCxrQkFBU2IsT0FBTyxhQURYO0FBRUwsc0JBQWFBLE9BQU87QUFGZjtBQUQ4QixNQUF4QixDQUFmOztBQU9BUyxjQUFTLENBQUUsT0FBRixFQUFXLFdBQVgsQ0FBVCxFQUFtQyxZQUFNO0FBQ3ZDQSxnQkFBUyxDQUFFVCxPQUFPLGlCQUFULENBQVQsRUFBc0MsWUFBTTtBQUMxQ1Msa0JBQVMsQ0FBRVQsT0FBTyxzQkFBVCxDQUFULEVBQTJDLFlBQU0sQ0FBRSxDQUFuRDtBQUNELFFBRkQ7QUFHRCxNQUpEO0FBS0Q7O0FBRUQsWUFBU2MsWUFBVCxDQUF1QkMsTUFBdkIsRUFBZ0M7QUFDOUJBLFlBQU9DLE9BQVAsQ0FBZ0IsMENBQWhCLEVBQTREO0FBQzFEQyxjQUFPO0FBQ0xDLGlCQUFRLGdCQUFVQyxRQUFWLEVBQXFCO0FBQzNCLGVBQUluQixPQUFPLHVCQUFYO0FBQ0E7QUFDQTtBQUNBLGVBQUttQixTQUFTQyxRQUFULEtBQXNCLFFBQTNCLEVBQXNDO0FBQ3BDcEIsb0JBQU9tQixTQUFTRSxPQUFULENBQWlCQyxJQUF4QjtBQUNEO0FBQ0RkLG9CQUFVUixJQUFWO0FBQ0Q7QUFUSTtBQURtRCxNQUE1RCxFQVlHLEVBQUV1QixRQUFRLEtBQVYsRUFaSDtBQWFEOztBQUVEWixhQUFXLENBQ1QsbUJBRFMsRUFFVCxnQkFGUyxDQUFYLEVBR0csVUFBVWEsT0FBVixFQUFtQkMsTUFBbkIsRUFBNEI7QUFDN0I7QUFDQSxTQUFLRCxRQUFRRSxRQUFSLElBQW9CRixRQUFRRSxRQUFSLENBQWlCWCxNQUExQyxFQUFtRDtBQUNqREQsb0JBQWNVLFFBQVFFLFFBQVIsQ0FBaUJYLE1BQS9CO0FBQ0Q7QUFDRFUsWUFBT0UsRUFBUCxDQUFXLDhDQUFYLEVBQTJELFVBQUVDLEtBQUYsRUFBU0MsSUFBVCxFQUFtQjtBQUM1RWYsb0JBQWNlLEtBQUtkLE1BQW5CO0FBQ0QsTUFGRDtBQUdELElBWEQ7QUFZRDs7QUFFRGUsUUFBT0MsT0FBUCxHQUFpQjtBQUNmbEMsMkJBQXdCQTtBQURULEVBQWpCLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkNDM0OTkxMTc4NmExYTc2OGZhOSIsImZ1bmN0aW9uIGxvYWRfaXB5dGhvbl9leHRlbnNpb24oKSB7XG5cbiAgdmFyIGV4dGVuc2lvbkxvYWRlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGxvYWRTY3JpcHQoIGhvc3QsIG5hbWUgKSB7XG4gICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzY3JpcHQnICk7XG4gICAgc2NyaXB0LnNyYyA9IG5hbWVcbiAgICAgID8gaG9zdCArIGAvanVuby8ke25hbWV9LmpzYFxuICAgICAgOiBob3N0O1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdCApO1xuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkSnVubyggaG9zdCApIHtcbiAgICBpZiAoIGV4dGVuc2lvbkxvYWRlZCApIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgcmVxUmVhY3QgPSB3aW5kb3cucmVxdWlyZWpzLmNvbmZpZyh7XG4gICAgICBwYXRoczoge1xuICAgICAgICAncmVhY3QnOiBob3N0ICsgJy9qdW5vL3JlYWN0JyxcbiAgICAgICAgJ3JlYWN0LWRvbSc6IGhvc3QgKyAnL2p1bm8vcmVhY3QtZG9tJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVxUmVhY3QoWyAncmVhY3QnLCAncmVhY3QtZG9tJyBdLCAoKSA9PiB7XG4gICAgICByZXFSZWFjdChbIGhvc3QgKyAnL2p1bm8vdmVuZG9yLmpzJ10sICgpID0+IHtcbiAgICAgICAgcmVxUmVhY3QoWyBob3N0ICsgJy9qdW5vL25iZXh0ZW5zaW9uLmpzJ10sICgpID0+IHt9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlS2VybmVsKCBrZXJuZWwgKSB7XG4gICAga2VybmVsLmV4ZWN1dGUoIFwiaW1wb3J0IG9zXFxucHJpbnQgb3MuZW52aXJvblsnSlVOT19IT1NUJ11cIiwge1xuICAgICAgaW9wdWI6IHtcbiAgICAgICAgb3V0cHV0OiBmdW5jdGlvbiggcmVzcG9uc2UgKSB7XG4gICAgICAgICAgdmFyIGhvc3QgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwJztcbiAgICAgICAgICAvL3ZhciBob3N0ID0gJ2RyYW1hLnRpbWJyLmlvJztcbiAgICAgICAgICAvL3ZhciBob3N0ID0gJ2FwcDAudGltYnIuaW8nO1xuICAgICAgICAgIGlmICggcmVzcG9uc2UubXNnX3R5cGUgPT09ICdzdHJlYW0nICkge1xuICAgICAgICAgICAgaG9zdCA9IHJlc3BvbnNlLmNvbnRlbnQudGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9hZEp1bm8oIGhvc3QgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHsgc2lsZW50OiBmYWxzZSB9ICk7IFxuICB9XG5cbiAgcmVxdWlyZWpzKCBbXG4gICAgXCJiYXNlL2pzL25hbWVzcGFjZVwiLFxuICAgIFwiYmFzZS9qcy9ldmVudHNcIlxuICBdLCBmdW5jdGlvbiggSnVweXRlciwgRXZlbnRzICkge1xuICAgIC8vIE9uIG5ldyBrZXJuZWwgc2Vzc2lvbiBjcmVhdGUgbmV3IGNvbW0gbWFuYWdlcnNcbiAgICBpZiAoIEp1cHl0ZXIubm90ZWJvb2sgJiYgSnVweXRlci5ub3RlYm9vay5rZXJuZWwgKSB7XG4gICAgICBoYW5kbGVLZXJuZWwoIEp1cHl0ZXIubm90ZWJvb2sua2VybmVsICk7XG4gICAgfVxuICAgIEV2ZW50cy5vbiggJ2tlcm5lbF9jcmVhdGVkLktlcm5lbCBrZXJuZWxfY3JlYXRlZC5TZXNzaW9uJywgKCBldmVudCwgZGF0YSApID0+IHtcbiAgICAgIGhhbmRsZUtlcm5lbCggZGF0YS5rZXJuZWwgKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsb2FkX2lweXRob25fZXh0ZW5zaW9uOiBsb2FkX2lweXRob25fZXh0ZW5zaW9uXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==