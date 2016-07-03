/* globals Pusher */
const React = require('react');
const MessageStore = require('../stores/message_store.js');
const MessageActions = require('../actions/message_actions.js');
const MessageForm = require('./message_form.jsx');
const SessionStore = require('../stores/session_store.js');

const Messages = React.createClass({
  getInitialState: function () {
    return {
      messages: MessageStore.all(),
      dashboardView: true
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
  messageView: function (messages) {
    const messageKeys = Object.keys(messages);
    return messageKeys.map(key => {
      const sender = messages[key].sender.username;
      if (SessionStore.currentUser().username === sender) {
        return (
          <div key={messages[key].id}>
            <div className="from-me">
              <p>{messages[key].content}</p>
            </div>
            <div className="clear"></div>
          </div>
        );
      } else {
        return (
          <div key={messages[key].id}>
            <div className="from-them">
              <p><b>{sender}:</b> {messages[key].content}</p>
            </div>
            <div className="clear"></div>
          </div>
        );
      }
    }
  );},
  render: function () {
    let messageJsx;
    if (this.state.dashboardView) {
      messageJsx = this.messageView(MessageStore.getLast(4).reverse());
    } else {
      messageJsx = this.messageView(this.state.messages);
    }
    return (
      <div>
        <span className="">{"Members: Paul, Daniel, Susan"}</span>
        <hr />
        <section className="chat-messages">
          {messageJsx}
        </section>
      </div>
    );
  }
});

module.exports = Messages;
