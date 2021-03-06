const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const EventConstants = require('../constants/event_constants.js');
const EventStore = new Store(AppDispatcher);

let _events = {};
let _upcomingEvents = {};

function updateAllEvents (events) {
  const eventKeys = Object.keys(events);
  for (let i = 0; i < eventKeys.length; i++) {
    _events[events[eventKeys[i]].id] = events[eventKeys[i]];
  }
}

function addEvent (evnt) {
  _events[evnt.id] = evnt;
}

function removeEvent (evnt) {
  delete _events[evnt.id];
}

function updateUpcomingEvents (events) {
  for (let i = 0; i < events.length; i++) {
    _upcomingEvents[events[i].id] = events[i];
  }
}

EventStore.upcomingEvents = function () {
  return _upcomingEvents;
};

EventStore.all = function () {
  const eventsArray = [];
  const eventKeys = Object.keys(_events);
  for (let i = 0; i < eventKeys.length; i++) {
    const startDateObj = new Date(_events[eventKeys[i]].start_date);
    const endDateObj = new Date(_events[eventKeys[i]].end_date);
    eventsArray.push({
      id: _events[eventKeys[i]].id,
      title: _events[eventKeys[i]].name,
      start: new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate(), startDateObj.getHours(), startDateObj.getMinutes(), startDateObj.getSeconds()),
      end: new Date(endDateObj.getFullYear(), endDateObj.getMonth(), endDateObj.getDate(), endDateObj.getHours(), endDateObj.getMinutes(), endDateObj.getSeconds())
    });
  }
  return eventsArray;
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
    case EventConstants.EVENT_DELETED:
      removeEvent(payload.evnt);
      EventStore.__emitChange();
      break;
    case EventConstants.RECEIVE_UPCOMING_EVENTS:
      updateUpcomingEvents(payload.events);
      EventStore.__emitChange();
      break;
  }
};

module.exports = EventStore;
