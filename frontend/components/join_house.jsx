const React = require('react');
const SessionStore = require('../stores/session_store.js');
const JoinHouseActions = require('../actions/join_house_actions.js');

const JoinHouse = React.createClass({
  getInitialState: function () {
    return {
      house_id: ""
    }
  },
  handleSubmit: function (e) {
    e.preventDefault();
    console.log('handle submit');
    JoinHouseActions.joinHouse(SessionStore.currentUser().id, this.state.house_id);
  },
  update: function (e) {
    this.setState({ house_id: e.target.value });
  },
  render: function () {
    return (
      <div className="row">
        <div className="input-field col s4">
          <form onSubmit={this.handleSubmit}>
            <input id="house-id" onChange={this.update} type="text" className="validate" />
            <label for="house-id">Enter House ID</label>
            <button className="btn waves-effect waves-light" type="submit" name="action">Join</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = JoinHouse;
