/* globals Pusher */
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
    this.pusher = new Pusher('2a359a50111bf7bde24b', {
      encrypted: true
    });

    let channel = this.pusher.subscribe('message');
    channel.bind('message_created', function(data) {
      MessageActions.fetchMessages();
    });
  },
  componentWillUnmount: function () {
    this.listener.remove();
    this.pusher.unsubscribe('house');
  },
  updateMessage: function () {
    this.setState({ messages: MessageStore.all() });
  },
  render: function () {
    const messages = this.state.messages;
    const messageKeys = Object.keys(messages);
    let messageJsx = messageKeys.map(key => {
      const sender = messages[key].user.username;
      return (
        <div key={messages[key].id}>
          <li key={messages[key].id}>
            <strong>{sender}: </strong>
            {messages[key].content}
          </li>
        </div>
      );
    });
    return (
      <div className="row message-view-dashboard">
        <ul className="">
          {messageJsx}
        </ul>
        <div className="message-action">
          <MessageForm />
        </div>
      </div>
    );
  }
});

module.exports = Messages;
