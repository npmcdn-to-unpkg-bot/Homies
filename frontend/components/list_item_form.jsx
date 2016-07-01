const React = require('react');

const ListItemForm = React.createClass({
  getInitialState: function () {
    return { content: "" };
  },
  update: function (property) {
    return (e) => this.setState({ [property]: e.target.value });
  },
  render: function () {
    return (
      <div>
        <div className="input-field col s6">
          <input id="list-item"
                 value={this.state.content}
                 onChange={this.update("content")}
                 type="text" />
          <label for="list-item">Item</label>
        </div>
        <a className="btn-floating waves-effect waves-light waves-light"
           onClick={this.props.addItem.bind(this, this.state.content)}>
          <i className="material-icons">add</i>
        </a>
      </div>
    );
  }
});

module.exports = ListItemForm;
