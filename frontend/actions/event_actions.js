const AppDispatcher = require('../dispatcher/dispatcher.js');
const EventApiUtil = require('../util/event_api_util.js');
const EventConstants = require('../constants/event_constants.js');

const EventActions = {
  fetchEvents: function () {
    EventApiUtil.fetchEvents(this.receiveEvents);
  },
  receiveEvents: function (events) {
    AppDispatcher.dispatch({
      actionType: EventConstants.RECEIVED_EVENTS,
      events: events
    });
  }
};

module.exports = EventActions;
