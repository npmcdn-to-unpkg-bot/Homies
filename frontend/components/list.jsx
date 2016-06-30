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
    console.log('before set state');
    this.setState({
      lists: ListStore.all()
    }, function () {
      console.log('finished updated state!');
    });
  },
  render: function () {
    const lists = this.state.lists;
    console.log('log me');
    const listKeys = Object.keys(lists);
    console.log(listKeys);
    let listJsx = listKeys.map(key => {
      return (<ListShow list={lists[key]}/>);
    });
    return (
      <div onClick={this.fetch}>
        <h1>Lists:</h1>
        {listJsx}
      </div>
    );
  }
});

module.exports = List;
