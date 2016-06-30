const React = require('react');
const MessageStore = require('../stores/message_store.js');
const MessageActions = require('../actions/message_actions.js');
const MessageForm = require('./message_form.jsx');
const SessionStore = require('../stores/session_store.js');

const Messages = React.createClass({
  getInitialState: function () {
    return {
      messages: MessageStore.all()
    };
  },
  componentDidMount: function () {
    this.listener = MessageStore.addListener(this.updateMessage);
    MessageActions.fetchMessages();
  },
  updateMessage: function () {
    this.setState({ messages: MessageStore.all() }, function () {
      console.log('updated state');
    });
  },
  render: function () {
    console.log('re-render');
    const messages = this.state.messages;
    const messageKeys = Object.keys(messages);
    let messageJsx = messageKeys.map(key => {
      const sender = messages[key].user.username;
      return (
        <div key={messages[key].id} id="scroll-animation">
          <li key={messages[key].id}>
            <strong>{sender}: </strong>
            {messages[key].content}
          </li>
        </div>
      );
    });
    return (
      <div className="row message-view-dashboard">
        <div className="message-content">
          <ul className="">
            {messageJsx}
          </ul>
        </div>
        <div className="message-action">
          <MessageForm />
        </div>
      </div>
    );
  }
});

module.exports = Messages;