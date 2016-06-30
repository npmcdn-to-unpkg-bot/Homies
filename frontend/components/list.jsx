const React = require('react');
const ListStore = require('../stores/list_store.js');
const ListActions = require('../actions/list_actions.js');
const SessionStore = require('../stores/session_store.js');

const List = React.createClass({
  getInitialState: function () {
    console.log('current user!');
    console.log(SessionStore.currentUser());
    return {
      lists: ListStore.fetchLists(SessionStore.currentUser().house_id)
    };
  },
  fetch: function () {
    console.log('fetch!');
    ListActions.fetchHousesLists();
  },
  render: function () {
    return (
      <div onClick={this.fetch}>
        hello from the list component
      </div>
    );
  }
});

module.exports = List;
