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
  update: function (property) {
    return (e) => this.setState({[property]: e.target.value});
  },
  updateStartDate: function (event, date) {
    this.setState({ startDate: date });
  },
  updateEndDate: function (event, date) {
    this.setState({ endDate: date });
  },
  updateStartTime: function (event, time) {
    this.setState({ startTime: time });
  },
  updateEndTime: function (event, time) {
    this.setState({ endTime: time });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    const formData = {
      name: this.state.eventName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    };
    console.log('form datda:');
    console.log(formData);
    EventActions.createEvent(formData);
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="login-form">
          <br />
          <div className="input-field col s4">
            <input id="eventName" type="eventName" className="validate" type="text"
              value={this.state.eventName}
              onChange={this.update("eventName")}/>
            <label for="eventName">Event Name:</label>
          </div>
          <div className="input-field col s4">
            <MuiThemeProvider muiTheme={muiTheme}>
              <DatePicker hintText="Start Date"
                          value={this.state.startDate}
                          container="inline"
                          mode="landscape"
                          onChange={this.updateStartDate} />
            </MuiThemeProvider>
          </div>
          <div className="input-field col s4">
            <MuiThemeProvider muiTheme={muiTheme}>
              <DatePicker hintText="End Date"
                          value={this.state.endDate}
                          container="inline"
                          mode="landscape"
                          onChange={this.updateEndDate} />
            </MuiThemeProvider>
          </div>
          <br />
          <div className="input-field col s4">
            <MuiThemeProvider muiTheme={muiTheme}>
              <TimePicker
                format="ampm"
                hintText="Start time"
                value={this.state.startTime}
                onChange={this.updateStartTime}
              />
            </MuiThemeProvider>
          </div>
          <div className="input-field col s4">
            <MuiThemeProvider muiTheme={muiTheme}>
              <TimePicker
                format="ampm"
                hintText="End time"
                value={this.state.endTime}
                onChange={this.updateEndTime}
              />
            </MuiThemeProvider>
          </div>
          <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
        </div>
        <BigCalendar
          {...this.props}
          events={events}
          defaultDate={new Date(2015, 3, 1)} />
      </form>
    );
  }
});

module.exports = EventForm;
