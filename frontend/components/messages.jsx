/* globals Pusher */
const React = require('react');
const MessageStore = require('../stores/message_store.js');
const SessionStore = require('../stores/session_store.js');
const HouseStore = require('../stores/house_store.js');
const MessageActions = require('../actions/message_actions.js');
const MessageForm = require('./message_form.jsx');
const Link = require('react-router').Link;
vex.defaultOptions.className = 'vex-theme-os';

const Messages = React.createClass({
  getInitialState: function () {
    return {
      messages: MessageStore.all(),
      dashboardView: true
    };
  },
  componentWillMount: function () {
    if (this.props.location && this.props.location.pathname === "/messages") {
      this.setState({ dashboardView: false });
    }
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
    this.updateScroll(0);
  },
  updateScroll: function (speed = 250) {
    const $parentEl = $(".message-container");
    const $messageDiv = $(".message-div");
    console.log('parent el');
    console.log($parentEl);
    console.log('message div');
    console.log($messageDiv);
    if ($parentEl.length > 0 && $messageDiv.length > 0) {
      const $lastEl = $messageDiv.eq(-1);
      const parentOffset = $parentEl.offset().top;
      const lastElOffset = $parentEl.children().eq(-1).offset().top;
      const newHeight = document.querySelector(".message-container").scrollHeight;
      $parentEl.animate({ scrollTop: newHeight }, 0);
    }
  },
  componentWillUnmount: function () {
    this.listener.remove();
    this.pusher.unsubscribe('house');
  },
  updateMessage: function () {
    this.setState({ messages: MessageStore.all() }, this.updateScroll);
  },
  messageView: function (messages) {
    const messageKeys = Object.keys(messages);
    return messageKeys.map(key => {
      const sender = messages[key].sender.username;
      if (SessionStore.currentUser().username === sender) {
        return (
          <div className="message-div message-div-right" key={messages[key].id}>
            <div className="from-me">
              <p>{messages[key].content}</p>
            </div>
            <div className="clear"></div>
          </div>
        );
      } else {
        return (
          <div className="message-div message-div-left" key={messages[key].id}>
            <div className="from-them">
              <p><b>{sender}:</b> {messages[key].content}</p>
            </div>
            <div className="clear"></div>
          </div>
        );
      }
    }
  );},
  columnClass: function () {
    if (this.state.dashboardView) {
      return "col s12 m6";
    } else {
      return "col s12 m12";
    }
  },
  messageAction: function () {
    if (this.state.dashboardView) {
      return (
        <div className="card-action">
          <Link to="/messages" activeClassName="current">View More Messages</Link>
        </div>
      );
    } else {
      return (<MessageForm />);
    }
  },
  render: function () {
    let messageJsx;
    if (this.state.dashboardView) {
      messageJsx = this.messageView(MessageStore.getLast(4).reverse());
    } else {
      messageJsx = this.messageView(this.state.messages);
    }
    const chatMembersObj = HouseStore.currentHomies();
    const chatMembersKeys = Object.keys(chatMembersObj);
    let chatMemberString = "Members: ";
    if (chatMembersKeys.length > 0) {
      for (let i = 0; i < chatMembersKeys.length; i++) {
        if (i === chatMembersKeys.length - 1) {
          chatMemberString += chatMembersObj[chatMembersKeys[i]].username;
        } else {
          chatMemberString += chatMembersObj[chatMembersKeys[i]].username + ", ";
        }
      }
    } else {
      chatMemberString = "Loading...";
    }
    return (
      <div className={this.columnClass()}>
        <div className="card grey lighten-4">
          <div className="card-content">
            <span className="">{chatMemberString}</span>
            <hr />
            <section className="chat-container">
              <div className="message-container">
                {messageJsx}
              </div>
            </section>
          </div>
          {this.messageAction()}
        </div>
      </div>
    );
  }
});

module.exports = Messages;
