const React = require('react');
const ListStore = require('../stores/list_store.js');
const ListActions = require('../actions/list_actions.js');
const SessionStore = require('../stores/session_store.js');
const ListShow = require('./list_show.jsx');
const ListForm = require('./list_form.jsx');

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
  componentWillUnmount: function () {
    this.listener.remove();
  },
  handleUpdates: function () {
    this.setState({ lists: ListStore.all() });
  },
  render: function () {
    const lists = this.state.lists;
    const listKeys = Object.keys(lists);
    let listJsx = listKeys.map(key => {
      return <ListShow
                key={lists[key].id}
                list={lists[key]}
                listItems={lists[key].list_items} />;
    });
    return (
      <div>
        <span className="">{"Recent Lists"}</span>
        <hr />
        {listJsx}
        <ListForm />
      </div>
    );
  }
});

module.exports = List;
