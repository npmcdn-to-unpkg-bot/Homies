const React = require('react');
const ListActions = require('../actions/list_actions.js');
const ListStore = require('../stores/list_store.js');

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
    console.log('save title');
    console.log(this.state.currentTitle);
    ListActions.updateList(this.props.list, this.state.currentTitle);
  },
  renderTitle: function () {
    if (!this.state.titleEditMode) {
      return this.props.list.title;
    } else {
      return (
          <form>
            <input id="edit-title"
                   type="title"
                   className="validate"
                   type="text"
                   value={this.state.currentTitle}
                   onChange={this.update("currentTitle")} />
            <button className="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                    onClick={this.saveTitle}>Save</button>
          </form>
      );
    }
  },
  updateTitle: function () {
    const newTitle = document.getElementById('edit-title');
    console.log(newTitle);
  },
  toggleEditMode: function () {
    this.setState({ titleEditMode: true });
  },
  update: function (property) {
    return (e) => this.setState({ [property]: e.target.value }, function () {
      console.log('new title');
      console.log(this.state.currentTitle);
    });
  },
  render: function () {
    console.log('rendering list show again');
    const listItems = this.props.listItems;
    let listItemsJsx;
    if (!listItems) {
      listItemsJsx = "You have no items on this list!";
    } else {
      listItemsJsx = listItems.map(item => {
        return (
          <li key={item.id}>
            {item.content}
          </li>
        );
      });
    }
    return (
      <div className="">
        <h5 onDoubleClick={this.toggleEditMode}>{ this.renderTitle() }</h5>
        <ul>
          {listItemsJsx}
        </ul>
      </div>
    );
  }
});

module.exports = ListShow;
