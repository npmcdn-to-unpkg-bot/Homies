const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');
const ErrorStore = require('../stores/error_store.js');
const hashHistory = require('react-router').hashHistory;

const LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      username: "",
      password: "",
      demoUsername: "pyo",
      demoPassword: "secret"
    };
  },
  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },
  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      hashHistory.push("/movein");
    }
  },
  componentWillUnmount() {
    this.errorListener.remove();
    this.sessionListener.remove();
  },
  formType: function () {
    return this.props.location.pathname.slice(1);
  },
  fieldErrors: function (field) {
    const errors = ErrorStore.formErrors(this.formType());
    if (!errors[field]) { return; }
    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });
    return <ul>{ messages }</ul>;
  },
  handleSubmit: function (e) {
		e.preventDefault();
		const formData = {
			username: this.state.username,
			password: this.state.password
		};
    if (this.props.location.pathname === "/login") {
      SessionActions.login(formData);
    } else {
      SessionActions.signup(formData);
    }
	},
  handleDemoLogin: function (e) {
    e.preventDefault();
    const formData = {
      username: this.state.demoUsername,
      password: this.state.demoPassword
    };
    SessionActions.login(formData);
  },
  update: function (property) {
    return (e) => this.setState({[property]: e.target.value});
  },
  render: function () {
    let navLink;
    if (this.formType() === "login") {
      navLink = <Link to="/signup">sign up instead</Link>;
    } else {
      navLink = <Link to="/login">log in instead</Link>;
    }
		return (
      <div className="row">
        <h5 className="center">LOGIN</h5>
        <div className="col s4 login-input">
          <form onSubmit={this.handleSubmit} className="center">
            { this.fieldErrors("base") }
            <input id="username" type="username" className="validate" type="text"
              value={this.state.username}
              onChange={this.update("username")}/>
            <label for="username">Username</label>
            <input id="password" type="password"
              value={this.state.password}
              onChange={this.update("password")}
              className="login-input validate"/>
            <label for="password">Password</label>
          </form>
          <br />
          <div className="center">
            <button className="btn waves-effect waves-light" onClick={this.handleSubmit} type="submit" name="action">Login</button>&nbsp;&nbsp;
            <button className="btn waves-effect waves-light" onClick={this.handleDemoLogin} type="submit" name="action">Demo Login</button>
          </div>
        </div>
      </div>
		);
	}
});

module.exports = LoginForm;
