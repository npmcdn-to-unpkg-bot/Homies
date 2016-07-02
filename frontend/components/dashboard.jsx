const React = require('react');
const List = require('./list.jsx');
const Bill = require('./bill.jsx');
const Messages = require('./messages.jsx');

const Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <div className="row">
          <div className="col s12 m7">
            <div className="card grey lighten-4">
              <div className="card-content">
                <Messages />
              </div>
              <div className="card-action">
                <a href="#">View more messages</a>
              </div>
            </div>
          </div>
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
          <div className="col s6">
            Events component
          </div>
          <div className="col s6">
            <Bill />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
