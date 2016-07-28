define(["react"], function(__WEBPACK_EXTERNAL_MODULE_12__) { return /******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jupyterReactJs = __webpack_require__(1);

	var _jupyterReactJs2 = _interopRequireDefault(_jupyterReactJs);

	var _dispatcher = __webpack_require__(5);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _components = __webpack_require__(10);

	var _components2 = _interopRequireDefault(_components);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var on_update = function on_update(module, props) {
	  _dispatcher2.default.dispatch({
	    actionType: module.toLowerCase() + '_update',
	    data: props
	  });
	};

	function load_ipython_extension() {
	  requirejs(["base/js/namespace", "base/js/events"], function (Jupyter, events) {
	    $('#kernel_indicator').append('<span id="juno_status"></span>');
	    _jupyterReactJs2.default.init(Jupyter, events, 'juno', { components: _components2.default, on_update: on_update });
	  });
	}

	module.exports = {
	  load_ipython_extension: load_ipython_extension
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

	var Area = __webpack_require__(2);
	var Manager = __webpack_require__(3);
	var ReactComponent = __webpack_require__(4);

	var init = function( Jupyter, events, comm_target, component_options ) {

	    requirejs([ "react", "react-dom" ], function( React, ReactDom ) {
	        window.React = React;
	        window.ReactDom = ReactDom;
	    
	        /**
	         * handle_kernel 
	         * creates an instance of a "Manager" used to listen for new comms and create new components
	         */
	        var handle_kernel = function(Jupyter, kernel) {
	          //if ( kernel.comm_manager && !kernel.component_manager ) {
	            var Component = ReactComponent( component_options );
	            kernel.component_manager = new Manager( comm_target, kernel, Component );
	          //}
	        };

	        /**
	         *
	         */
	        // TODO need to handle clear out output calls
	        var handle_cell = function(cell) {
	            if (cell.cell_type==='code') {
	                cell.react_dom = new Area( cell );
	            }
	        };

	        // On new kernel session create new comm managers
	        if (Jupyter.notebook && Jupyter.notebook.kernel) {
	            handle_kernel(Jupyter, Jupyter.notebook.kernel);
	        }
	        events.on('kernel_created.Kernel kernel_created.Session', function(event, data) {
	            handle_kernel(Jupyter, data.kernel);
	        });

	        // Create react component areas in cells
	        // Each cell in the notebook will have an area 
	        // that a component will render itself into
	        var cells = Jupyter.notebook.get_cells();
	        cells.forEach( cell => {
	            handle_cell( cell );
	        });

	        events.on( 'create.Cell', function( event, data ) {
	            handle_cell( data.cell );
	        });

	        events.on( 'delete.Cell', function( event, data ) {
	            if ( data.cell && data.cell.widgetarea ) {
	                data.cell.react_dom.remove();
	            }
	        });
	    });

	};

	module.exports = {
	  Manager,
	  ReactComponent,
	  Area,
	  init
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	// TODO 
	// needs to bind to clear_display calls
	// add a "dispose" method that will will wipre all contents, call that on clear_display and cell delete etc.

	var Area = function( cell ) {
	    var area = document.createElement('div');
	    area.classList.add('jupyter-react-area');
	    area.classList.add('widget-area');
	    this.area = area;

	    var _prompt = document.createElement('div');
	    _prompt.classList.add('prompt');
	    area.appendChild(_prompt);

	    var subarea = document.createElement('div');
	    subarea.classList.add('jupyter-react-subarea');
	    subarea.classList.add('widget-subarea');
	    area.appendChild(subarea);

	    this.subarea = subarea;

	    if (cell.input) {
	        cell.input.after(area);
	    } else {
	        throw new Error('Cell does not have an `input` element.  Is it not a CodeCell?');
	    }
	};

	module.exports = Area;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Manager(target, kernel, Component) {
	  //this.components = {};
	  kernel.comm_manager.register_target(target, function (comm, msg) {
	    if (msg['msg_type'] === 'comm_open') {
	      //this.components[ comm.comm_id ] = new Component( comm, msg );
	      new Component(comm, msg);
	    }
	  });
	  return this;
	};

	module.exports = Manager;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// Base component that handles comm messages and renders components to notebook cell

	module.exports = function Component( options ) {
	  return function (comm, props) {
	    var module = props.content.data.module;
	    var domId = props.content.data.domId;

	    // Handle all messages over this comm
	    var handle_msg = msg => {
	      var data = msg.content.data;

	      switch (data.method) {
	        case "update":
	          if ( options.on_update ) {
	            return options.on_update(module, data.props);
	          }
	          // else re-render
	          render_component(msg);
	          break;
	        case "display":
	          render_component(msg);
	          break;
	      }
	    };

	    var render_component = function (msg) {
	      var msg_id = msg.parent_header.msg_id;
	      var cell = Jupyter.notebook.get_msg_cell(msg_id);
	      var newProps = props.content.data;
	      newProps.cell = cell;
	      newProps.comm = comm;
	      var element = _createMarkup( options.components[module], newProps );
	      _render(element, msg);
	    };

	    // Render the component to either the output cell or given domId
	    var _render = function (element, msg) {
	      var display;
	      if (domId) {
	        display = document.getElementById(domId);
	      } else {
	        display = _outputAreaElement(msg);
	      }
	      ReactDom.render(element, display);
	    };

	    // Create React Elements from components and props 
	    var _createMarkup = function (component, cProps) {
	      return React.createElement(component, cProps);
	    };

	    // Get the DOM Element to render to
	    var _outputAreaElement = function (msg) {
	      var msg_id = msg.parent_header.msg_id;
	      var cell = Jupyter.notebook.get_msg_cell(msg_id);
	      return cell.react_dom.subarea;
	    };

	    // register message callback
	    comm.on_msg(handle_msg);
	    return this;
	  };
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _flux = __webpack_require__(6);

	exports.default = new _flux.Dispatcher();
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(7);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var invariant = __webpack_require__(9);

	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	var Dispatcher = (function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);

	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */

	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   */

	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */

	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   */

	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   */

	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };

	  return Dispatcher;
	})();

	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function (condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _List = __webpack_require__(11);

	var _List2 = _interopRequireDefault(_List);

	var _Status = __webpack_require__(13);

	var _Status2 = _interopRequireDefault(_Status);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  List: _List2.default,
	  Status: _Status2.default
	};
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function selectKernel(props, kernel) {
	  props.comm.send({ method: 'select', data: { kernel: kernel } }, props.cell.get_callbacks());
	}

	function buildList(props) {
	  return props.items.map(function (item, i) {
	    return _react2.default.createElement(
	      'li',
	      { key: i },
	      ' ',
	      item,
	      ' ',
	      _react2.default.createElement(
	        'button',
	        { id: item, onClick: function onClick() {
	            return selectKernel(props, item);
	          } },
	        ' Select'
	      ),
	      ' '
	    );
	  });
	}

	var List = function List(props) {
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'ul',
	      null,
	      buildList(props)
	    )
	  );
	};

	exports.default = List;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(14);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _dispatcher = __webpack_require__(5);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Status = function (_React$Component) {
	  _inherits(Status, _React$Component);

	  function Status(props) {
	    _classCallCheck(this, Status);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Status).call(this, props));

	    _this.state = {
	      status: 'idle'
	    };
	    return _this;
	  }

	  _createClass(Status, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      _dispatcher2.default.register(function (payload) {
	        if (payload.actionType === 'status_update') {
	          _this2.setState({ status: payload.data.status });
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var status = this.state.status;

	      var classes = (0, _classnames2.default)('kernel_idle_icon', {
	        'kernel_busy_icon': status === 'busy'
	      });

	      return _react2.default.createElement(
	        'span',
	        { id: 'juno_status' },
	        _react2.default.createElement(
	          'span',
	          { 'class': 'kernel_indicator_name' },
	          'Juno'
	        ),
	        ' ',
	        _react2.default.createElement('i', { id: 'juno-status', className: classes })
	      );
	    }
	  }]);

	  return Status;
	}(_react2.default.Component);

	exports.default = Status;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }
/******/ ])});;