/******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports, __webpack_require__) {

	window.Tracker = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Tracker = __webpack_require__(2);
	var defaults = __webpack_require__(3);

	/**
	 * Create an instance of Tracker
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Tracker} A new instance of Tracker
	 */
	function createInstance(defaultConfig) {
	  var instance = new Tracker(defaultConfig);

	  return Object.assign({}, instance, Tracker.prototype);
	}

	// Create the default instance to be exported
	var tracking = createInstance(defaults);

	// Expose Tracker class to allow class inheritance
	tracking.Tracker = Tracker;

	// Factory for creating new instances
	tracking.create = function create(instanceConfig) {
	  return createInstance(instanceConfig);
	};

	module.exports = tracking;

	// Allow use of default import syntax in TypeScript
	module.exports.default = tracking;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var defaults = __webpack_require__(3);
	var Listeners = __webpack_require__(4);

	/**
	 * Create a new instance of Tracker
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Tracker() {
	  var instanceConfig = typeof arguments[0] == "object" ? arguments[0] : {};
	  this.defaults = Object.assign({}, defaults, instanceConfig);
	  this.listener = Listeners(this.defaults);
	}

	/**
	 * Set data for next page view
	 *
	 * @param {Object} data The data for the next pageview
	 */
	Tracker.prototype.setData = function setData(data) {
	  this.defaults.nextPageView = Object.assign({}, data);
	  return true;
	};
	// Alias for pageview
	Tracker.prototype.sd = Tracker.prototype.setData;

	/**
	 * Dispatch a pageview
	 *
	 * @param {Object} data The data specific for this pageview
	 */
	Tracker.prototype.pageview = function pageview(data) {
	  const d = this.defaults.nextPageView
	    ? Object.assign({}, this.defaults.nextPageView)
	    : {};
	  this.defaults.nextPageView = {};

	  return this.listener.publish("pageview", Object.assign({}, d, data));
	};
	// Alias for pageview
	Tracker.prototype.pv = Tracker.prototype.pageview;

	/**
	 * Dispatch a event
	 *
	 * @param {Object} data The data specific for this event
	 */
	Tracker.prototype.event = function event(eventName, data) {
	  return this.listener.publish("event/" + eventName, data);
	};
	// Alias for event
	Tracker.prototype.ev = Tracker.prototype.event;

	/**
	 * Dispatch a event
	 *
	 * @param {Object} data The data specific for this event
	 */
	Tracker.prototype.subscribe = function subscribe(eventName, callback) {
	  return this.listener.subscribe(eventName, callback);
	};
	// Alias for subscribe
	Tracker.prototype.sub = Tracker.prototype.subscribe;

	module.exports = Tracker;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	var defaults = {
	  debug: false,
	  nextPageView: {}
	};

	module.exports = defaults;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	var Listeners = function() {
	  var events = {};
	  var config = typeof arguments[0] == "object" ? arguments[0] : {};
	  var hOP = events.hasOwnProperty;
	  var defaultMaxTimeout = 4000;

	  return {
	    subscribe: function(eventName, listener) {
	      if (!hOP.call(events, eventName)) events[eventName] = [];
	      var index = events[eventName].push(listener) - 1;
	      return {
	        remove: function() {
	          delete events[eventName][index];
	        }
	      };
	    },
	    publish: function(eventName, info, maxTimeout = defaultMaxTimeout) {
	      if (config.debug && !events[eventName]) {
	        console.log("### simple-tracking - NO EVENTS:", eventName, info);
	      }
	      return new Promise(function(resolve, reject) {
	        if (!hOP.call(events, eventName)) {
	          resolve(info);
	        } else {
	          var count = 0;
	          var max = 0;
	          var f = function(moreData = {}) {
	            max += 1;
	            return function() {
	              count += 1;
	              info = Object.assign({}, info, moreData);
	              if (max === count) {
	                resolve(info);
	              }
	            };
	          };
	          events[eventName].forEach(function(cb) {
	            cb(info != undefined ? info : {}, f);
	          });

	          if (max === count) {
	            resolve(info);
	          }
	        }
	        setTimeout(reject, maxTimeout);
	      });
	    }
	  };
	};

	module.exports = Listeners;


/***/ })
/******/ ]);