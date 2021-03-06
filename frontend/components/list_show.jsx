const React = require('react');
const ListActions = require('../actions/list_actions.js');
const ListStore = require('../stores/list_store.js');
const ListItemShow = require('./list_item_show.jsx');
const ListItemForm = require('./list_item_form.jsx');

const ListShow = React.createClass({
  getInitialState: function () {
    return {
      titleEditMode: false,
      currentTitle: this.props.list.title
    };
  },
  componentDidMount: function () {
    this.listener = ListStore.addListener(this.receiveListUpdate);
  },
  receiveListUpdate: function () {
    this.setState({ titleEditMode: false });
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  saveTitle: function () {
    if (this.state.currentTitle !== "") {
      ListActions.updateList(this.props.list, this.state.currentTitle);
      Materialize.toast('Updated the list!', 2000);
    }
  },
  renderTitle: function () {
    if (!this.state.titleEditMode) {
      return this.props.list.title;
    } else {
      return (
          <form onSubmit={this.saveTitle}>
            <input id="edit-title"
                   className="validate"
                   type="text"
                   value={this.state.currentTitle}
                   onChange={this.update("currentTitle")} />
          </form>
      );
    }
  },
  toggleListEditMode: function () {
    this.setState({ titleEditMode: true });
  },
  update: function (property) {
    return (e) => this.setState({ [property]: e.target.value });
  },
  render: function () {
    const listItems = this.props.listItems;
    let listItemsJsx;
    if (!listItems) {
      listItemsJsx = "You have no items on this list!";
    } else {
      listItemsJsx = listItems.map(item => {
        return (
          <ListItemShow key={item.id} item={item} />
        );
      });
    }
    return (
      <li className="list-item">
        <h5 className="list-title" onDoubleClick={this.toggleListEditMode}>{ this.renderTitle() }</h5>
        <ul>
          {listItemsJsx}
        </ul>
      </li>
    );
  }
});

module.exports = ListShow;
