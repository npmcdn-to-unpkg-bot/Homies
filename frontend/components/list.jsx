const React = require('react');
const ListStore = require('../stores/list_store.js');
const ListActions = require('../actions/list_actions.js');
const SessionStore = require('../stores/session_store.js');
const ListShow = require('./list_show.jsx');

const List = React.createClass({
  getInitialState: function () {
    return {
      lists: ListStore.all()
    };
  },
  componentDidMount: function () {
    this.listener = ListStore.addListener(this.handleUpdates);
    ListActions.fetchHousesLists();
  },
  handleUpdates: function (lists) {
    this.setState({ lists: ListStore.all() });
  },
  render: function () {
    const lists = this.state.lists;
    const listKeys = Object.keys(lists);
    let listJsx = listKeys.map(key => {
      return <ListShow list={lists[key]} listItems={lists[key].list_items}/>;
    });

    return (
      <div onClick={this.fetch}>
        Lists:
        {listJsx}
      </div>
    );
  }
});

module.exports = List;
