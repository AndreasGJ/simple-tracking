"use strict";

var defaults = require("./../defaults");

/**
 * Create a new instance of Tracker
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Tracker() {
  var instanceConfig = typeof arguments[0] == "object" ? arguments[0] : {};
  this.defaults = Object.assign({}, defaults, instanceConfig);
}

/**
 * Dispatch a pageview
 *
 * @param {Object} data The data specific for this pageview
 */
Tracker.prototype.pageview = function pageview(data) {
  console.log("pageview fired", data);
};

/**
 * Dispatch a event
 *
 * @param {Object} data The data specific for this event
 */
Tracker.prototype.event = function event(data) {
  console.log("event fired", data);
};

module.exports = Tracker;
