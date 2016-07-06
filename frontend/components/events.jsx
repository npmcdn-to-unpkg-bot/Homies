const React = require('react');
const Link = require('react-router').Link;
const EventStore = require('../stores/event_store.js');
const EventActions = require('../actions/event_actions.js');
// Calendar
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
BigCalendar.momentLocalizer(moment);

const Events = React.createClass({
  getInitialState: function () {
    return {
      dashboardView: true,
      events: EventStore.all()
    };
  },
  componentWillMount: function () {
    this.listener = EventStore.addListener(this.updateEvents);
    EventActions.fetchEvents();
  },
  updateEvents: function () {
    this.setState({ events: EventStore.all() });
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  selectSlot: function (slotInfo) {
    const messagePrompt = `Event slot: <br />Start: ${slotInfo.start.toLocaleString()}<br />End: ${slotInfo.end.toLocaleString()}<br />`;
    vex.dialog.buttons.YES.text = "Create"
    vex.dialog.prompt({
      message: messagePrompt,
      input: "<input type='text' name='evnt[name]' id='event-name'/>",
      placeholder: 'Event name',
      callback: function (response) {
        if (response && response["evnt[name]"] != "") {
          const formData = {
            name: response["evnt[name]"],
            startDate: slotInfo.start,
            endDate: slotInfo.end
          };
          EventActions.createEvent(formData);
        }
      }
    });
  },
  selectEvent: function (event) {
    vex.dialog.buttons.YES.text = "Delete"
    const messagePrompt = `<center>${event.title}</center>`;
    vex.dialog.alert({
      message: messagePrompt,
      callback: function (response) {
        if (response) {
          EventActions.deleteEvent(event);
        }
      }
    })
  },
  render: function () {
    return (
      <div className="col s12 m7">
        <div className="card grey lighten-4">
          <div className="card-content">
            <div>
              <BigCalendar
                selectable
                events={this.state.events}
                defaultView='week'
                views={['week', 'day']}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={this.selectEvent}
                onSelectSlot={this.selectSlot}
              />
            </div>
          </div>
          <div className="card-action">
            <a href="#">View more events</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Events;
