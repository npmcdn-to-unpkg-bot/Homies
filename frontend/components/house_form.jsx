const React = require('react');
const Link = require('react-router').Link;
const HouseActions = require('../actions/house_actions.js');
const HouseStore = require('../stores/house_store.js');
const hashHistory = require('react-router').hashHistory;

const HouseForm = React.createClass({
  getInitialState: function () {
    return {
      name: "",
      street_1: "",
      street_2: "",
      city: "",
      state: "",
      zip: ""
    };
  },
  update: function (property) {
    return (e) => this.setState({[property]: e.target.value});
  },
  componentDidMount: function () {
    this.houseListener = HouseStore.addListener(this.redirectIfHouseCreated);
  },
  redirectIfHouseCreated: function () {
    console.log('router push!');
    hashHistory.push("/dashboard");
  },
  handleSubmit: function (e) {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      street_1: this.state.street_1,
      street_2: this.state.street_2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    };
    HouseActions.createHouse(formData);
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit} className="">
        <label> Name:
          <input type="text"
                value={this.state.name}
                onChange={this.update("name")} />
        </label>
        <br />
        <label> Street 1:
          <input type="text"
                value={this.state.street_1}
                onChange={this.update("street_1")} />
        </label>
        <br />
        <label> Street 2:
          <input type="text"
                value={this.state.street_2}
                onChange={this.update("street_2")} />
        </label>
        <br />
        <label> city:
          <input type="text"
                value={this.state.city}
                onChange={this.update("city")} />
        </label>
        <br />
        <label> State:
          <input type="text"
                value={this.state.state}
                onChange={this.update("state")} />
        </label>
        <br />
        <label> Zipcode:
          <input type="text"
                value={this.state.zip}
                onChange={this.update("zip")} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
});

module.exports = HouseForm;
