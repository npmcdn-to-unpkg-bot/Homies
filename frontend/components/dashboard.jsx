const React = require('react');
const List = require('./list.jsx');
const Bill = require('./bill.jsx');

const Dashboard = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col s6">
          <List />
        </div>
        <div className="col s6">
          <Bill />
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
