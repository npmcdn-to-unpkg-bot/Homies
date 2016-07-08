const React = require('react');
const ListStore = require('../stores/list_store.js');
const ListActions = require('../actions/list_actions.js');
const SessionStore = require('../stores/session_store.js');
const ListShow = require('./list_show.jsx');
const ListForm = require('./list_form.jsx');
const Link = require('react-router').Link;

const List = React.createClass({
  getInitialState: function () {
    return {
      lists: ListStore.all(),
      dashboardView: true
    };
  },
  componentWillMount: function () {
    if (this.props.location && this.props.location.pathname === "/lists") {
      this.setState({ dashboardView: false });
    }
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
    return listKeys.map(key => {
      return (<ListShow
                key={lists[key].id}
                list={lists[key]}
                listItems={lists[key].list_items} />);
    });
  },
  columnClass: function () {
    if (this.state.dashboardView) {
      return ("col s12 m5");
    } else {
      return ("col s12 m12");
    }
  },
  listAction: function () {
    if (this.state.dashboardView) {
      return (
        <div className="card-action">
          <Link to="/lists" activeClassName="current">View More Lists</Link>
        </div>
      );
    } else {
      return (<ListForm />);
    }
  },
  formatDateObject: function (dateStr) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date(dateStr);
    const monthDue = dateObj.getUTCMonth();
    const dayDue = dateObj.getDate();
    const yearDue = dateObj.getFullYear();
    return `${monthNames[monthDue]} ${dayDue}, ${yearDue}`;
  },
  render: function () {
    let listJsx;
    let lastUpdatedTime;
    if (ListStore.getRecentlyUpdated()) {
      lastUpdatedTime = ListStore.getRecentlyUpdated().updated_at;
    } else {
      lastUpdatedTime = "";
    }
    if (this.state.dashboardView && ListStore.getRecentlyUpdated() !== undefined) {
      const listObj = {};
      listObj[ListStore.getRecentlyUpdated().id] = ListStore.getRecentlyUpdated();
      listJsx = this.listView(listObj);
    } else {
      listJsx = this.listView(this.state.lists);
    }

    return (
      <div className={this.columnClass()}>
        <div className="card grey lighten-4">
          <div className="card-content">
            <div>
              <span className="">Recent Lists: (Last updated: {this.formatDateObject(lastUpdatedTime)})</span>
              <hr />
              {listJsx}
            </div>
          </div>
          {this.listAction()}
        </div>
      </div>
    );
  }
});

module.exports = List;
