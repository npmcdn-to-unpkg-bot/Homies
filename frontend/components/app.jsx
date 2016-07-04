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
    HouseActions.updateCurrentHouse(SessionStore.currentUser().house_id);
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
  greeting: function () {
    if (SessionStore.isUserLoggedIn()) {
      return (
        <ul className="right hide-on-med-and-down">
          <li><a href="sass.html"><i className="material-icons">search</i></a></li>
          <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
          <li><a href="collapsible.html"><i className="material-icons">refresh</i></a></li>
          <li><a href="mobile.html"><i className="material-icons">more_vert</i></a></li>
        </ul>
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
    return (

      <div>
        <ul id="settings-dropdown" className="dropdown-content">
          <li><a href="/">Edit profile</a></li>
          <li><a onClick={ this._handleLogOut }>Logout</a></li>
          <li className="divider"></li>
          <li><a href="/">Close</a></li>
        </ul>
        <nav className="blue accent-1">
          <div className="nav-wrapper">
              <a href="/" className="brand-logo center">{currentHouseName}</a>
              <ul className="right hide-on-med-and-down">
                <li><a className="dropdown-button" href="/" data-activates="settings-dropdown">Hello, {SessionStore.currentUser().username}<i className="material-icons right">arrow_drop_down</i></a></li>
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
