const React = require('react');
const SessionActions = require('../actions/session_actions.js');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store.js');
const HouseStore = require('../stores/house_store.js');
const HouseActions = require('../actions/house_actions.js');

const App = React.createClass({
  getInitialState: function () {
    return {
      house: undefined
    };
  },
  componentWillMount: function () {
    this.listener = HouseStore.addListener(this.handleUpdate);
    const currHouseId = SessionStore.currentUser().house_id;
    HouseActions.updateCurrentHouse(currHouseId);
    HouseActions.updateCurrentHomies();
  },
  handleUpdate: function () {
    this.setState({
      house: HouseStore.currentHouse()
    });
  },
  _handleLogOut: function () {
    SessionActions.logout();
  },
  greetingOld() {
    if (SessionStore.isUserLoggedIn()) {
    	return (
    		<hgroup className="header-group">
    			<h2 className="header-name">Hi, {SessionStore.currentUser().username}!</h2>
    			<input className="header-button" type="submit" value="logout" onClick={ this._handleLogOut } />
          <i className="small material-icons">settings</i>
    		</hgroup>
    	);
    } else if ( !["/login", "/signup"].includes(this.props.location.pathname) ) {
      return (
        <div className="login-signup">
          <Link to="/login" activeClassName="current" className="waves-effect waves-light btn">Login</Link>
          &nbsp;or&nbsp;
          <Link to="/signup" activeClassName="current" className="waves-effect waves-light btn">Sign Up!!</Link>
        </div>
      );
    }
  },
  render: function () {
    let currentHouseName;
    if (this.state.house) {
      currentHouseName = this.state.house.name;
    } else {
      currentHouseName = "";
    }
    let greetingJsx;
    if (Object.keys(SessionStore.currentUser()).length > 0) {
      greetingJsx =  (
        <ul className="right hide-on-med-and-down">
          <li><Link to="/messages" activeClassName="current">Messages</Link></li>
          <li><Link to="/events" activeClassName="current">Events</Link></li>
          <li><Link to="/lists" activeClassName="current">Lists</Link></li>
          <li><Link to="/bills" activeClassName="current">Bills</Link></li>
        </ul>
      );
    } else {
      greetingJsx = (
        <div>
          <Link to="/login" activeClassName="current">Login</Link>
          <Link to="/signup" activeClassName="current">Sign Up</Link>
        </div>
      );
    }
    return (
      <div>
        <ul id="settings-button" className="dropdown-content">
          <li><a href="/">Edit profile</a></li>
          <li><a onClick={ this._handleLogOut }>Logout</a></li>
          <li className="divider"></li>
          <li><a href="/">Close</a></li>
        </ul>
        <nav className="blue accent-1">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo center" activeClassName="current">{currentHouseName}</Link>
              <ul className="right hide-on-med-and-down">
                <li>{greetingJsx}</li>
              </ul>
          </div>
        </nav>
        <div className="container">
          <br />
          <div className="row center">
            Homies is a web application that centralizes bill payments, messaging, lists, and calendar events between housemates.
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
