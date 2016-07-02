const React = require('react');
const ListActions = require('../actions/list_actions.js');
const ListItemActions = require('../actions/list_item_actions.js');
const ListStore = require('../stores/list_store.js');

const ListItemShow = React.createClass({
  getInitialState: function () {
    return {
      contentEditMode: false,
      currentContent: this.props.item.content
    };
  },
  saveContent: function () {
    if (this.state.currentContent !== "") {
      ListItemActions.updateListItem(this.props.item, this.state.currentContent);
      ListActions.fetchHousesLists();
      this.setState({ contentEditMode: false });
    }
  },
  componentDidMount: function () {
    this.listener = ListStore.addListener(this.receiveItemUpdate);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  receiveItemUpdate: function () {

  },
  toggleItemEditMode: function () {
    this.setState({ contentEditMode: true });
  },
  update: function (property) {
    return (e) => this.setState({ [property]: e.target.value }, function () {
      console.log('updated state');
      console.log(this.state.currentContent);
    });
  },
  renderContent: function () {
    if (!this.state.contentEditMode) {
      return this.props.item.content;
    } else {
      return (
        <form onSubmit={this.saveContent}>
          <input id="edit-content"
                 type="text"
                 className="validate"
                 value={this.state.currentContent}
                 onChange={this.update("currentContent")} />
        </form>
      );
    }
  },
  render: function () {
    return (
      <li onDoubleClick={this.toggleItemEditMode}>
        {this.renderContent()}
      </li>
    );
  }
});

module.exports = ListItemShow;
