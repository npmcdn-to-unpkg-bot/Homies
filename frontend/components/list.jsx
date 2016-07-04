const React = require('react');
const ListStore = require('../stores/list_store.js');
const ListActions = require('../actions/list_actions.js');
const SessionStore = require('../stores/session_store.js');
const ListShow = require('./list_show.jsx');
const ListForm = require('./list_form.jsx');

const List = React.createClass({
  getInitialState: function () {
    return {
      lists: ListStore.all(),
      dashboardView: true
    };
  },
  componentDidMount: function () {
    this.listener = ListStore.addListener(this.handleUpdates);
    ListActions.fetchHousesLists();
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  handleUpdates: function () {
    this.setState({ lists: ListStore.all() });
  },
  listView: function (lists) {
    const listKeys = Object.keys(lists);
    console.log('paul');
    console.log(listKeys[0]);
    return listKeys.map(key => {
      return (<ListShow
                key={lists[key].id}
                list={lists[key]}
                listItems={lists[key].list_items} />);
    });
  },
  render: function () {
    console.log('getting most recentt');
    console.log(ListStore.getRecentlyUpdated());
    let listJsx;
    let lastUpdatedTime;
    if (ListStore.getRecentlyUpdated()) {
      lastUpdatedTime = ListStore.getRecentlyUpdated().updated_at;
    } else {
      lastUpdatedTime = "";
    }
    if (this.state.dashboardView && ListStore.getRecentlyUpdated() !== undefined) {
      console.log('dashboardView');
      console.log(ListStore.getRecentlyUpdated().updated_at);
      const listObj = {};
      listObj[ListStore.getRecentlyUpdated().id] = ListStore.getRecentlyUpdated();
      listJsx = this.listView(listObj);
    } else {
      listJsx = this.listView(this.state.lists);
    }

    return (
      <div>
        <span className="">Recent Lists: (Last updated: {lastUpdatedTime})</span>
        <hr />
        {listJsx}
        <ListForm />
      </div>
    );
  }
});

module.exports = List;
