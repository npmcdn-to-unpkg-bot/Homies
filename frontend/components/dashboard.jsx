const React = require('react');
const List = require('./list.jsx');
const Bill = require('./bill.jsx');
const Messages = require('./messages.jsx');

const Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <div className="row">
          <Messages />
          <div className="col s12 m5">
            <div className="card grey lighten-4">
              <div className="card-content">
                <List />
              </div>
              <div className="card-action">
                <a href="#">View more lists</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s7">
            Events component
          </div>
          <div className="col 5">
            <Bill />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
