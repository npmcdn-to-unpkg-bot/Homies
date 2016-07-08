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
      events: EventStore.all(),
      upcomingEvents: EventStore.upcomingEvents()
    };
  },
  componentWillMount: function () {
    if (this.props.location && this.props.location.pathname === "/events") {
      this.setState({ dashboardView: false });
    }
    this.listener = EventStore.addListener(this.updateEvents);
    EventActions.fetchEvents();
    EventActions.fetchUpcomingEvents();
  },
  updateEvents: function () {
    this.setState({
      events: EventStore.all(),
      upcomingEvents: EventStore.upcomingEvents()
    });
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  toggleView: function () {
    this.setState({ dashboardView: !this.state.dashboardView })
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
  formatDateObject: function (dateStr) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date(dateStr);
    const monthDue = dateObj.getUTCMonth();
    const dayDue = dateObj.getDate();
    const yearDue = dateObj.getFullYear();
    return `${monthNames[monthDue]} ${dayDue}, ${yearDue}`;
  },
  eventAction: function () {
    if (this.state.dashboardView) {
      return (
        <div className="card-action">
          <Link to="/events" activeClassName="current">View More Events</Link>
        </div>
      );
    } else {
      return "";
    }
  },
  renderDashboardEvents: function () {
    const upcomingEvents = this.state.upcomingEvents;
    const upcomingEventsKeys = Object.keys(upcomingEvents);
    if (upcomingEventsKeys.length > 0) {
      return upcomingEventsKeys.map(key => {
        return (
          <tr>
            <td>{upcomingEvents[key].name}</td>
            <td>{this.formatDateObject(upcomingEvents[key].start_date)}</td>
          </tr>
        );
      });
    } else {
      return "";
    }
  },
  eventView: function () {
    if (this.state.dashboardView) {
      return (
        <div>
          <b><center>Upcoming Events</center></b>
          <table className="centered">
            <thead>
              <tr>
                <th data-field="name">Name</th>
                <th data-field="start">Date</th>
              </tr>
            </thead>
            <tbody>
              {this.renderDashboardEvents()}
            </tbody>
          </table>

        </div>
      );
    } else {
      return (
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
      )
    }
  },
  render: function () {
    return (
      <div className="col s12 m7">
        <div className="card grey lighten-4">
          <div className="card-content">
            {this.eventView()}
          </div>
          {this.eventAction()}
        </div>
      </div>
    );
  }
});

module.exports = Events;
