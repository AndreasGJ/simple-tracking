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
  if(typeof this.defaults.onSetData === "function"){
    this.defaults.onSetData(data);
  }
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
  const t = this;
  const delay = this.defaults.pageDelay || 0;
  if(typeof this.defaults.onPageview === "function"){
    this.defaults.onPageview(data);
  }

  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      const d = t.defaults.nextPageView
        ? Object.assign({}, t.defaults.nextPageView, data)
        : data;
      t.defaults.nextPageView = {};
      t.listener
        .publish("pageview", d)
        .then(resolve)
        .catch(reject);
    }, delay);
  });
};
// Alias for pageview
Tracker.prototype.pv = Tracker.prototype.pageview;

/**
 * Dispatch a event
 *
 * @param {Object} data The data specific for this event
 */
Tracker.prototype.event = function event(eventName, data) {
    if(typeof this.defaults.onEvent === "function"){
        this.defaults.onEvent(eventName, data);
    }
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
