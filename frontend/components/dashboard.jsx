const React = require('react');
const List = require('./list.jsx');
const Bill = require('./bill.jsx');
const Messages = require('./messages.jsx');
const Events = require('./events.jsx');

const Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <div className="row">
          <Messages />
          <List />
        </div>
        <div className="row">
          <Events />
          <div className="col s12 m5">
            <div className="card grey lighten-4">
              <div className="card-content">
                <div>
                  <span className="">Bills Component</span>
                  <hr />
                  <Bill />
                </div>
              </div>
              <div className="card-action">
                <a href="#">View more bills</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
