const React = require('react');
const SessionActions = require('../actions/session_actions.js');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store.js');

const App = React.createClass({
  _handleLogOut(){
    SessionActions.logout();
  },
  greeting() {
    if (SessionStore.isUserLoggedIn()) {
    	return (
    		<hgroup className="header-group">
    			<h2 className="header-name">Hi, {SessionStore.currentUser().username}!</h2>
    			<input className="header-button" type="submit" value="logout" onClick={ this._handleLogOut } />
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
    return (
      <div className="container">
        <header>
          <Link to="/" className="header-link"><h1>Homies</h1></Link>
          <div className="row center">
            { this.greeting() }
          </div>
          <div className="row center">
            Homies is a web application that centralizes bill payments, messaging, lists, and calendar events between housemates.
          </div>
        </header>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
