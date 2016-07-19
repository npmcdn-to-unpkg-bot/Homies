const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const hashHistory = require('react-router').hashHistory;

const SignupForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      username: "",
      password: "",
      f_name: "",
      l_name: ""
    };
  },
  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },
  redirectIfLoggedIn: function () {
    if (SessionStore.isUserLoggedIn()) {
      hashHistory.push("/movein");
    }
  },
  componentWillUnmount: function () {
    this.errorListener.remove();
    this.sessionListener.remove();
  },
  handleSubmit: function (e) {
		e.preventDefault();
		const formData = {
			username: this.state.username,
			password: this.state.password,
      f_name: this.state.f_name,
      l_name: this.state.l_name
		};
    SessionActions.signup(formData);
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
    return <ul>{messages}</ul>;
  },
  update: function (property) {
    return (e) => this.setState({[property]: e.target.value});
  },
  render: function () {

		return (
			<div className="signup-form-container">
        <h5 className="center">Sign Up!</h5>
        { this.fieldErrors("base") }
				<form onSubmit={this.handleSubmit} className="signup-form-box">
					<div className="signup-form">

            <div className="input-field">
              <input id="f-name" type="text"
		            value={this.state.f_name}
		            onChange={this.update("f_name")}
								className="login-input" />
              <label for="f-name">First name</label>
            </div>

            <div className="input-field">
              <input id="l-name" type="text"
		            value={this.state.l_name}
		            onChange={this.update("l_name")}
								className="login-input" />
              <label for="l-name">Last name</label>
            </div>

            <div className="input-field">
              <input id="username" type="text"
		            value={this.state.username}
		            onChange={this.update("username")}
								className="login-input" />
              <label for="username">Username</label>
            </div>

            <div className="input-field">
              <input id="password" type="password"
		            value={this.state.password}
		            onChange={this.update("password")}
								className="login-input" />
              <label for="password">Password</label>
            </div>


            <button className="btn waves-effect waves-light" type="submit" name="action">Join</button>
					</div>
				</form>
			</div>
		);
	}
});

module.exports = SignupForm;
