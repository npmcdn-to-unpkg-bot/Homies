const AppDispatcher = require('../dispatcher/dispatcher.js');
const SessionConstants = require('../constants/session_constants.js');
const ErrorActions = require('./error_actions');
const SessionApiUtil = require('../util/session_api_util.js');
const hashHistory = require('react-router').hashHistory;


const SessionActions = {
  signup: function (formData) {
    SessionApiUtil.signup(formData, SessionActions.receiveCurrentUser, ErrorActions.setErrors);
  },
  login: function (formData) {
    SessionApiUtil.login(formData,        SessionActions.receiveCurrentUser, ErrorActions.setErrors);
  },
  logout: function () {
    SessionApiUtil.logout(SessionActions.removeCurrentUser);
  },
  fetchCurrentUser: function (complete) {
    SessionApiUtil.fetchCurrentUser(
      SessionActions.receiveCurrentUser, complete);
  },
  receiveCurrentUser: function (currentUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: currentUser
    });
  },
  removeCurrentUser: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
    hashHistory.push("/login");
  }
};

module.exports = SessionActions;
