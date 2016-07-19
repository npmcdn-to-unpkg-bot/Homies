const React = require('react');
const MessageActions = require('../actions/message_actions.js');

const MessageForm = React.createClass({
  getInitialState: function () {
    return { content: "" };
  },
  componentWillMount: function () {
    this.updateScroll();
  },
  update: function (e) {
    this.setState({ content: e.target.value });
  },
  updateScroll: function () {
    const messageDiv = document.getElementById("message-input");
    if (messageDiv) {
      $('#message-input').scrollTop($('#message-input')[0].scrollHeight);
    }
  },
  handleSubmit: function (e) {
    e.preventDefault();
    if (this.state.content.length > 0) {
      MessageActions.createMessage(this.state);
    }
    this.setState({ content: "" });
    this.updateScroll();
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="compose-message-wrap">
          <input id="message-input"
                 className="message-input"
                 placeholder="Type a message..."
                 type="text"
                 value={this.state.content}
                 onChange={this.update} />
        </div>
      </form>
    );
  }
});

module.exports = MessageForm;
