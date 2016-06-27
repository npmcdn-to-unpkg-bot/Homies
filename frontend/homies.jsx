// React
const React = require('react');
const ReactDOM = require('react-dom');
//Router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const App = React.createClass({
  render: function () {
    return (
      <div>hello from the app div</div>
    )
  }
});

const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={App} />
  </Router>
)

document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('root');
  ReactDOM.render(appRouter, root);
});
