const AppDispatcher = require('../dispatcher/dispatcher.js');
const EventApiUtil = require('../util/event_api_util.js');
const EventConstants = require('../constants/event_constants.js');

const EventActions = {
  fetchEvents: function () {
    EventApiUtil.fetchEvents(EventActions.receiveEvents);
  },
  receiveEvents: function (events) {
    AppDispatcher.dispatch({
      actionType: EventConstants.RECEIVED_EVENTS,
      events: events
    });
  },
  createEvent: function (evnt) {
    EventApiUtil.createEvent(evnt, EventActions.receivedCreatedEvent);
  },
  receivedCreatedEvent: function (evnt) {
    AppDispatcher.dispatch({
      actionType: EventConstants.EVENT_CREATED,
      evnt: evnt
    });
  },
  deleteEvent: function (evnt) {
    EventApiUtil.deleteEvent(evnt, EventActions.receivedDeletedEvent);
  },
  receivedDeletedEvent: function (evnt) {
    AppDispatcher.dispatch({
      actionType: EventConstants.EVENT_DELETED,
      evnt: evnt
    });
  },
  fetchUpcomingEvents: function () {
    EventApiUtil.fetchUpcomingEvents(EventActions.receiveUpcomingEvents);
  },
  receiveUpcomingEvents: function (events) {
    AppDispatcher.dispatch({
      actionType: EventConstants.RECEIVE_UPCOMING_EVENTS,
      events: events
    });
  }
};

module.exports = EventActions;
