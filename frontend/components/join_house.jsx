const React = require('react');
const SessionStore = require('../stores/session_store.js');
const JoinHouseActions = require('../actions/join_house_actions.js');
const HouseStore = require('../stores/house_store.js');
const hashHistory = require('react-router').hashHistory;

const JoinHouse = React.createClass({
  getInitialState: function () {
    return {
      house_id: ""
    };
  },
  componentDidMount: function () {
    this.listener = HouseStore.addListener(this.handleUpdate);
  },
  handleUpdate: function () {
    hashHistory.push("/dashboard");
  },
  handleSubmit: function (e) {
    e.preventDefault();
    if (this.state.house_id !== "") {
      JoinHouseActions.joinHouse(SessionStore.currentUser().id, this.state.house_id);
    }
  },
  update: function (e) {
    this.setState({ house_id: e.target.value });
  },
  render: function () {
    return (
      <div className="row">
        <div className="input-field">
          <form onSubmit={this.handleSubmit}>
            <input id="house-id"
                   onChange={this.update}
                   type="text"
                   className="validate" />
            <label for="house-id">Enter House ID</label>
            <center><button className="btn waves-effect waves-light"   type="submit" name="action">Join</button></center>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = JoinHouse;
