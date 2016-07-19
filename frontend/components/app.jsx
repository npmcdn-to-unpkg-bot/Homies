const React = require('react');
const SessionActions = require('../actions/session_actions.js');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store.js');
const HouseStore = require('../stores/house_store.js');
const HouseActions = require('../actions/house_actions.js');

const App = React.createClass({
  getInitialState: function () {
    return {
      house: HouseStore.currentHouse(),
      user: SessionStore.currentUser()
    };
  },
  componentWillMount: function () {
    this.houseListener = HouseStore.addListener(this.handleUpdate);
    this.sessionListener = SessionStore.addListener(this.handleUpdate);
    // HouseActions.updateCurrentHouse(this.state.house.id);
    HouseActions.updateCurrentHomies();
  },
  componentDidMount: function () {
    const footerHeight = Math.max($(document).height(), $(window).height()) + "px";
    $('.page-footer').css({ 'margin-top': '800px'});
  },
  handleUpdate: function () {
    this.setState({
      house: HouseStore.currentHouse(),
      user: SessionStore.currentUser(),
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
  footer: function () {
    if (SessionStore.isUserLoggedIn()) {
      return (
        <footer className="page-footer blue accent-3">
          <div className="footer-copyright">
            <div className="container">
            © 2016 Paul Okuda
            </div>
          </div>
        </footer>
      );
    } else {
      return "";
    }
  },
  render: function () {
    let currentHouseName;
    if (this.state.house) {
      currentHouseName = this.state.house.name;
    } else {
      currentHouseName = "HOMIES";
    }
    let greetingJsx;
    if (Object.keys(SessionStore.currentUser()).length > 0) {
      greetingJsx =  (
        <ul className="nav-item-container">
          <div>
            <li className="">
              <Link to="/"><span className="ion-ios-home">&nbsp;HOMIES</span></Link>
            </li>
          </div>
          <div>
            <li className="nav-item">
              <Link to="/messages"><span className="ion-chatboxes nav-icon">&nbsp;MESSAGES</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/events"><span className="ion-calendar nav-icon" >&nbsp;EVENTS</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/lists" activeClassName="current"><span className="ion-ios-list nav-icon">&nbsp;LISTS</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/bills" activeClassName="current"><span className="ion-cash nav-icon">&nbsp;BILLS</span></Link>
            </li>
            <li className="nav-item">
              <a onClick={ this._handleLogOut }>LOGOUT</a>
            </li>
          </div>
        </ul>
      );
    } else {
      greetingJsx = (
        <ul>
          <li><Link to="/login" activeClassName="current">Login</Link></li>
          <li><Link to="/signup" activeClassName="current">Sign Up</Link></li>
        </ul>
      );
    }
    return (
      <div className="main-container">
        <nav className="nav-container blue accent-3">
          <Link to="/" className="brand-logo" activeClassName="current"></Link>
          {greetingJsx}
        </nav>
        <div className="body-container">
          <br />
          <div className="row center tag">
            Homies is a single-page application that centralizes bill payments, messaging, lists, and calendar events between housemates.
          </div>
          {this.props.children}
        </div>
        {/* this.footer() */}
      </div>
    );
  }
});

module.exports = App;
