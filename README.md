# Simple tracking

This repo will give a simple way to control your tracking setup no matter which tracking setup you have in the frontend.

## How to use it

You would need to import the library and then subscribe to the events. I would recommend creating a `tracking` folder, and then do this setup:

**/tracking/index.js**
```javascript
import Tracker from "simple-tracking";

var tracker = Tracker.create({
  // Insert settings here
});

tracker.subscribe('pageview', function(data){
  // Send tracking for pageview here
});
tracker.subscribe('event/tester-event-name', function(data){
  // Send tracking for event/tester-event-name here
});

export default tracker;
```

And then you are able to import your tracker and execute the following events:

```javascript
import tracker from "/tracking";

// execute a pageview
tracker.pageview({
  title: "Hallo world"
});

// execute an event
tracker.event("tester-event-name", {
  some: "data"
});

```
