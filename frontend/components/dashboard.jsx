const React = require('react');
const Lists = require('./list.jsx');
const Messages = require('./messages.jsx');
const Events = require('./events.jsx');
const Bills = require('./bill.jsx');

const Dashboard = React.createClass({
  render: function () {
    return (
      <div className="dashboard-container">
        <div className="dash-top">
          <Messages />
          <Bills />
        </div>
        <div className="dash-bottom">
          <Events />
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
