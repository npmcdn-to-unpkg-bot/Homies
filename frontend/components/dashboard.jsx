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
          <Lists />
        </div>
        <div className="row">
          <Events />
          <Bills />
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
