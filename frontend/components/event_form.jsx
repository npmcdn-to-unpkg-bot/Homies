const React = require('react');
const EventActions = require('../actions/event_actions.js');
// Date picker stuff
import {DatePicker} from 'material-ui';
import {TimePicker} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();
// Calendar
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
BigCalendar.momentLocalizer(moment);

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


const EventForm = React.createClass({
  getInitialState: function () {
    return {
      title: "",
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null
    };
  },
  selectSlot: function (slotInfo) {
    console.log('slot info');
    console.log(slotInfo.start);
    const messagePrompt = `Event slot: <br /><br />start ${slotInfo.start.toLocaleString()}<br />end: ${slotInfo.end.toLocaleString()}<br />`;
    vex.dialog.buttons.YES.text = "Create"
    vex.dialog.prompt({
      message: messagePrompt,
      input: "<input type='text' name='evnt[name]' id='event-name'/>",
      placeholder: 'Event name',
      callback: function (response) {
        if (response["evnt[name]"] !== "") {
          const formData = {
            name: response["evnt[name]"],
            startDate: slotInfo.start,
            endDate: slotInfo.end
          };
          EventActions.createEvent(formData)
        }
      }
    });
  },
  selectEvent: function (event) {
    console.log('event');
    console.log(event);
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
      <div>
        <BigCalendar
          selectable
          events={this.props.events}
          defaultView='week'
          views={['week', 'day']}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={this.selectEvent}
          onSelectSlot={this.selectSlot}
        />
      </div>
    );
  }
});

module.exports = EventForm;
