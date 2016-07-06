const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const EventConstants = require('../constants/event_constants.js');
const EventStore = new Store(AppDispatcher);

let _events = {};

function updateAllEvents (events) {
  const eventKeys = Object.keys(events);
  for (let i = 0; i < eventKeys.length; i++) {
    _events[events[eventKeys[i]].id] = events[eventKeys[i]]
  }
}

function addEvent (evnt) {
  _events[evnt.id] = evnt;
}

EventStore.all = function () {
  return _events;
};

EventStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case EventConstants.RECEIVED_EVENTS:
      updateAllEvents(payload.events);
      EventStore.__emitChange();
      break;
    case EventConstants.EVENT_CREATED:
      addEvent(payload.evnt);
      EventStore.__emitChange();
      break;
  }
};

module.exports = EventStore;
