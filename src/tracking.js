"use strict";

var Tracker = require("./core/Tracker");
var defaults = require("./defaults");

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
