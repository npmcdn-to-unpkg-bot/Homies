const React = require('react');
const List = require('./list.jsx');
const Bill = require('./bill.jsx');
const Messages = require('./messages.jsx');

const Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <List />
          </div>
          <div className="col s6">
            <Bill />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <Messages />
          </div>
          <div className="col s6">
            TBD
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
