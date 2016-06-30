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
          <br />
          <div className="input-field col s12">
            <input id="content"
                   placeholder="Type message here..."
                   className="validate"
                   type="text"
                   value={this.state.message}
                   onChange={this.update} />
          </div>


          <button className="btn waves-effect waves-light" type="submit" name="action">Send</button>
        </div>
      </form>
    );
  }
});

module.exports = MessageForm;
