const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const EventConstants = require('../constants/event_constants.js');
const EventStore = new Store(AppDispatcher);

let _events = {};

function updateAllEvents (events) {
  console.log('update all events');
  console.log(events);
  const eventKeys = Object.keys(events);
  for (let i = 0; i < eventKeys.length; i++) {
    _events[events[eventKeys[i]].id] = events[eventKeys[i]];
  }
}

function addEvent (evnt) {
  _events[evnt.id] = evnt;
}

EventStore.all = function () {
  const eventsArray = [];
  const eventKeys = Object.keys(_events);
  for (let i = 0; i < eventKeys.length; i++) {
    console.log('timee');
    const startDateObj = new Date(_events[eventKeys[i]].start_date);
    const endDateObj = new Date(_events[eventKeys[i]].end_date);
    eventsArray.push({
      title: _events[eventKeys[i]].name,
      start: new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate(),
                      startDateObj.getHours(), startDateObj.getMinutes(), startDateObj.getSeconds()),
      end: new Date(endDateObj.getFullYear(), endDateObj.getMonth(), endDateObj.getDate(),
                      endDateObj.getHours(), endDateObj.getMinutes(), endDateObj.getSeconds())
    });
  }
  console.log('eventsArray:');
  console.log(eventsArray);
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
  }
};

module.exports = EventStore;
