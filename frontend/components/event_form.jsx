const React = require('react');
// Date picker stuff
import {DatePicker} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

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
      eventName: "",
      startDate: null,
      endDate: null
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
  handleSubmit: function (e) {
    e.preventDefault();
    const formData = {
      eventName: this.state.eventName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };
    console.log('form data:');
    console.log(formData);
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
              <DatePicker ref="startDate" hintText="Start Date" value={this.state.startDate} container="inline" mode="landscape"
                onChange={this.updateStartDate} />
            </MuiThemeProvider>
          </div>
          <div className="input-field col s4">
            <MuiThemeProvider muiTheme={muiTheme}>
              <DatePicker hintText="End Date" value={this.state.endDate} container="inline" mode="landscape"
                onChange={this.updateEndDate} />
            </MuiThemeProvider>
          </div>
          <br />
          <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
        </div>
      </form>
    );
  }
});

module.exports = EventForm;
