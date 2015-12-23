/**
 * Post model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Template = require('./template.model');
var TemplateEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TemplateEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Template.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TemplateEvents.emit(event + ':' + doc._id, doc);
    TemplateEvents.emit(event, doc);
  }
}

module.exports = TemplateEvents;
