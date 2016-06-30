const React = require('react');

const MessageItem = React.createClass({
  render: function () {
    return (
      <div>
        <blockquote>{this.props.sender}</blockquote>
        <li>
          {this.props.messageItem.content}
        </li>
      </div>
    );
  }
});

module.exports = MessageItem;
