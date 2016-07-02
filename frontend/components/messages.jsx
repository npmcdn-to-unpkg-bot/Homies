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
  render: function () {
    let messageJsx;
    if (this.state.dashboardView) {
      const dashboardMessages = MessageStore.getLast(4);
      const dashboardMessageKeys = Object.keys(dashboardMessages);
      messageJsx = dashboardMessageKeys.map(key => {
        const sender = dashboardMessages[key].sender.username;
        if (SessionStore.currentUser().username === dashboardMessages[key].sender.username) {
          return (
            <div>
              <div key={dashboardMessages[key].id} className="from-me">
                <p>{dashboardMessages[key].content}</p>
              </div>
              <div className="clear"></div>
            </div>
          );
        } else {
          return (
            <div>
              <div key={dashboardMessages[key].id} className="from-them">
                <p><b>{sender}:</b> {dashboardMessages[key].content}</p>
              </div>
              <div className="clear"></div>
            </div>
          );
        }
      });
    } else {
      const messages = this.state.messages;
      const messageKeys = Object.keys(messages);
      messageJsx = messageKeys.map(key => {
        const sender = messages[key].sender.username;
        if (SessionStore.currentUser().username === messages[key].sender.username) {
          return (
            <div>
              <div key={messages[key].id} className="from-them">
                <p>{sender}: {messages[key].content}</p>
              </div>
              <div className="clear"></div>
            </div>
          );
        } else {
          return (
            <div>
              <div key={messages[key].id} className="from-me">
                <p>{messages[key].content}</p>
              </div>
              <div className="clear"></div>
            </div>
          );
        }
      });
    }
    return (
      <div>
        <span className="">{"Members: Paul, Oscar, Sam, and Max"}</span>
        <hr />
        <section className="chat-messages">
          {messageJsx}
        </section>
      </div>
    );
  }
});

module.exports = Messages;
