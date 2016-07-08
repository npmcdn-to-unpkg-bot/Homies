const React = require('react');
const Lists = require('./list.jsx');
const Messages = require('./messages.jsx');
const Events = require('./events.jsx');
const Bills = require('./bill.jsx');

const Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <div className="row">
          <Messages />
          <Events />
        </div>
        <div className="row">
          <Lists />
          <Bills />
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
