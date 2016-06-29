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
			<div className="login-form-container">
        <h1>signup</h1>
        { this.fieldErrors("base") }
				<form onSubmit={this.handleSubmit} className="login-form-box">
					<div className="login-form">
		        <br />
						<label>Username:
            { this.fieldErrors("username") }
							<input type="text"
		            value={this.state.username}
		            onChange={this.update("username")}
								className="login-input" />
						</label>

		        <br />
						<label>Password:
              { this.fieldErrors("password") }
		          <input type="password"
		            value={this.state.password}
		            onChange={this.update("password")}
								className="login-input" />
						</label>

		        <br />
            <label>First name:
              { this.fieldErrors("f_name") }
							<input type="text"
		            value={this.state.f_name}
		            onChange={this.update("f_name")}
								className="login-input" />
						</label>

            <br />
            <label> Last name:
              { this.fieldErrors("l_name") }
							<input type="text"
		            value={this.state.l_name}
		            onChange={this.update("l_name")}
								className="login-input" />
						</label>

            <br />
						<input type="submit" value="Submit" />
					</div>
				</form>
			</div>
		);
	}
});

module.exports = SignupForm;
