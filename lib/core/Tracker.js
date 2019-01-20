"use strict";

var defaults = require("./../defaults");
var Listeners = require("./Listeners");

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
  const d = this.defaults.nextPageView ? Object.assign({}, this.defaults.nextPageView) : {};
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