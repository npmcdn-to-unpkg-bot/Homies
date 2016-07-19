const React = require('react');
const HouseStore = require('../stores/house_store.js');
const SessionStore = require('../stores/session_store.js');
const HouseForm = require('./house_form.jsx');
const JoinHouse = require('./join_house.jsx');

const MoveIn = React.createClass({
  getInitialState: function () {
    return {
      join_house: undefined
    };
  },
  joinHouse: function () {
    this.setState({ join_house: true });
  },
  createHouse: function () {
    this.setState({ join_house: false });
  },
  currentComponent: function () {
    if (this.state.join_house === undefined) {
      return (
        <div className="movein-items">
          <a onClick={this.joinHouse} className="waves-effect waves-light btn-large">Join House</a>&nbsp;
          <a onClick={this.createHouse} className="waves-effect waves-light btn-large">Create House</a>
        </div>
      );
    } else if (this.state.join_house) {
      return (
        <JoinHouse />
      );
    } else {
      return (
        <HouseForm />
      );
    }
  },
  render: function () {
    return (
      <div className="movein-container">
        {this.currentComponent()}
      </div>
    );
  }
});

module.exports = MoveIn;
