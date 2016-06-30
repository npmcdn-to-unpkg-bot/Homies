const React = require('react');
const MessageStore = require('../stores/message_store.js');
const MessageActions = require('../actions/message_actions.js');
const MessageForm = require('./message_form.jsx');
const MessageItem = require('./message_item.jsx');
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
    this.setState({ messages: MessageStore.all() });
  },
  render: function () {
    const messages = this.state.messages;
    const messageKeys = Object.keys(messages);
    const currentUser = SessionStore.currentUser().username;
    let messageJsx = messageKeys.map(key => {
      return (<MessageItem sender={currentUser} messageItem={messages[key]} />);
    });
    return (
      <div>
        <ul>
          {messageJsx}
        </ul>
        <MessageForm />
      </div>
    );
  }
});

module.exports = Messages;
