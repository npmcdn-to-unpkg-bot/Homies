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
      password: ""
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
  update(property) {
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
        <div className="center">
          Please { this.formType() } or { navLink }
        </div>
        <form onSubmit={this.handleSubmit}>
          { this.fieldErrors("base") }
					<div className="login-form">
		        <br />
						<label> Username:
              { this.fieldErrors("username") }
							<input type="text"
		            value={this.state.username}
		            onChange={this.update("username")}
								className="login-input" />
						</label>

		        <br />
						<label> Password:
              { this.fieldErrors("password") }
		          <input type="password"
		            value={this.state.password}
		            onChange={this.update("password")}
								className="login-input" />
						</label>

		        <br />
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
					</div>
				</form>
			</div>
		);
	}
});

module.exports = LoginForm;
