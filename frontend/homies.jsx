// React
const React = require('react');
const ReactDOM = require('react-dom');
// Router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
// Components
const App = require('./components/app.jsx');
const LoginForm = require('./components/login_form.jsx');
const SignupForm = require('./components/signup_form.jsx');
const HouseForm = require('./components/house_form.jsx');
const MoveIn = require('./components/movein.jsx');
const Dashboard = require('./components/dashboard.jsx');
const Messages = require('./components/messages.jsx');
const List = require('./components/list.jsx');
//Testing
const SessionActions = require('./actions/session_actions.js');
const SessionStore = require('./stores/session_store.js');
window.actions = SessionActions;
window.store = SessionStore;

function _ensureLoggedIn(nextState, replace) {
  // We don't want users to be able to visit our 'new' or 'review' routes
  // if they haven't already signed in/up. Let's redirect them!
  // `replace` is like a redirect. It replaces the current entry
  // into the history (and the hashFragment), so the Router is forced
  // to re-route.
    if (!SessionStore.isUserLoggedIn()) {
      console.log('here!');
      replace('/login');
    } else {
      console.log('wow');
    }
}


const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="login" component={LoginForm} />
      <Route path="signup" component={SignupForm} />
      <Route path="movein" component={MoveIn} />
      <Route path="messages" component={Messages} />
      <Route path="lists" component={List} />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function () {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }
  const root = document.getElementById('root');
  ReactDOM.render(appRouter, root);
});
