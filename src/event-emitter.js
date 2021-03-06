import { Set } from 'immutable';

// TODO: once
// TODO: unit test
// Good example of a complete(?) implementation: https://github.com/Wolfy87/EventEmitter
function EventEmitter() {
  this._listeners = {};
}

EventEmitter.prototype.on = function (eventName, fn) {
  var listeners = this._listeners[eventName] || Set();

  this._listeners[eventName] = listeners.add(fn);
};

EventEmitter.prototype.off = function (eventName, fn) {
  var listeners = this._listeners[eventName] || Set();
  if (fn) {
    this._listeners[eventName] = listeners.delete(fn);
  } else {
    this._listeners[eventName] = listeners.clear();
  }
};

EventEmitter.prototype.trigger = function (eventName, args) {

  //fire events like my:custom:event -> my:custom -> my
  var events = eventName.split(':');
  while(!!events.length){
    var currentEvent = events.join(':');
    var listeners = this._listeners[currentEvent] || Set();
    //trigger handles
    listeners.forEach(function (listener) {
      listener.apply(null, args);
    });
    events.splice((events.length - 1), 1);
  }
};

export default EventEmitter;
