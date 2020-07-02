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
