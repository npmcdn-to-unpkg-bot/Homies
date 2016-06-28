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
        <nav className="login-signup">
          <Link to="/login" activeClassName="current">Login</Link>
          &nbsp;or&nbsp;
          <Link to="/signup" activeClassName="current">Sign up!</Link>
        </nav>
      );
    }
  },
  render: function () {
    return (
      <div>
        <header>
          <Link to="/" className="header-link"><h1>Homies</h1></Link>
          { this.greeting() }
        </header>
        {this.props.children}
      </div>
    )
  }
});

module.exports = App;
