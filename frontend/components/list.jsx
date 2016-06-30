const React = require('react');
const ListStore = require('../stores/list_store.js');
const ListActions = require('../actions/list_actions.js');
const SessionStore = require('../stores/session_store.js');

const List = React.createClass({
  getInitialState: function () {
    return {
      lists: ListStore.all()
    };
  },
  componentDidMount: function () {
    this.listener = ListStore.addListener(this.handleUpdates);
  },
  handleUpdates: function (lists) {
    this.setState({ lists: ListStore.all() })
  },
  fetch: function () {
    console.log('fetch!');
    ListActions.fetchHousesLists();
  },
  listObjectToArray: function () {
    const lists = [];
    const listKeys = Object.keys(this.state.lists);
    listKeys.forEach(key => {
      lists.push(this.state.lists[key]);
    });
    return lists;
  },
  render: function () {
    let listJsx = this.listObjectToArray().map(list => {
      return <li key={list}>{list}</li>
    });

    if (listJsx.length === 0) {
      listJsx = "omg";
    }
    return (
      <div onClick={this.fetch}>
        {listJsx}
      </div>
    );
  }
});

module.exports = List;
