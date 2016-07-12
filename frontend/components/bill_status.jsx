const React = require('react');
const BillActions = require('../actions/bill_actions.js');

const BillStatus = React.createClass({
  getInitialState: function () {
    return { completed: this.props.completed };
  },
  toggleButton: function () {
    const newState = !this.state.completed;
    BillActions.toggleCompleted(this.props.bill, newState);
    this.setState({ completed: newState });
  },
  buttonClass: function () {
    if (this.state.completed) {
      return "waves-effect waves-light teal lighten-2 btn";
    } else {
      return "waves-effect waves-light blue accent-3 btn";
    }
  },
  render: function () {
    return (
      <a className={this.buttonClass()}
         onClick={this.toggleButton}>
         {this.state.completed == true ? "Done" : "Pay"}
       </a>
    );
  }
});

module.exports = BillStatus;
