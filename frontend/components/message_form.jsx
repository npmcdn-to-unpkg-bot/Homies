const React = require('react');
const MessageActions = require('../actions/message_actions.js');

const MessageForm = React.createClass({
  getInitialState: function () {
    return { content: "" };
  },
  update: function (e) {
    this.setState({ content: e.target.value });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    if (this.state.content.length > 0) {
      MessageActions.createMessage(this.state);
    }
    this.setState({ content: "" }, function () {
      document.getElementById('content').value = "";
    });
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="login-form">
          <div className="col s12">
            <input className="message-input"
                   placeholder="Type a message..."
                   type="text"
                   value={this.state.message}
                   onChange={this.update} />
          </div>
        </div>
      </form>
    );
  }
});

module.exports = MessageForm;
