"use strict";
const React = require('react');
const Link = require('react-router').Link;
const EventStore = require('../stores/event_store.js');
const EventActions = require('../actions/event_actions.js');
const EventForm = require('./event_form.jsx');

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
  handleUpdate: function (e) {
    console.log('handle update');
    console.log(e.target.value);
  },
  createEvent: function () {
    vex.dialog.prompt({
      message: "<center>Please enter your event information</center>",
      input: "<label for='event-name'>Event name:</label><br><input name='event[name]' type='text' id='event-name' /><br><label for='event-start-date'>Start Date:</label><br><input name='event[start_date]' type='text' id='event-start-date' />",
      callback: function (response) {
        console.log('vexschema!');
        console.log(response);
      }
    });
  },
  render: function () {
    return (
      <div className="col s12 m7">
        <div className="card grey lighten-4">
          <div className="card-content">
            <div>
              <EventForm events={this.state.events} />
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
