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
const Events = require('./components/events.jsx');
const Bills = require('./components/bill.jsx');
//Testing
const SessionActions = require('./actions/session_actions.js');
const SessionStore = require('./stores/session_store.js');
window.actions = SessionActions;
window.store = SessionStore;

const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} onEnter={ ensureLoggedIn } />
      <Route path="login" component={LoginForm} />
      <Route path="signup" component={SignupForm} />
      <Route path="movein" component={MoveIn} onEnter={ checkIfHasHouse } />
      <Route path="messages" component={Messages} onEnter={ ensureLoggedIn }/>
      <Route path="lists" component={List} onEnter={ ensureLoggedIn } />
      <Route path="events" component={Events} onEnter={ ensureLoggedIn } />
      <Route path="bills" component={Bills} onEnter={ ensureLoggedIn } />
    </Route>
  </Router>
);

function checkIfHasHouse (nextState, replace) {
    if (SessionStore.currentUser().house_id) {
      replace('/');
    }
}

function ensureLoggedIn (nextState, replace) {
  if (Object.keys(SessionStore.currentUser()).length === 0) {
    replace('/login');
  }
}


document.addEventListener('DOMContentLoaded', function () {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }
  const root = document.getElementById('root');
  ReactDOM.render(appRouter, root);
});
