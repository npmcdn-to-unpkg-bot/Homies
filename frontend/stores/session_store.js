const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const SessionStore = new Store(AppDispatcher);
const SessionConstants = require('../constants/session_constants.js');

let _currentUser = {};
let _currentUserHasBeenFetched = false;

const _login = function (currentUser) {
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
};

const _logout = function () {
  _currentUser = {};
  _currentUserHasBeenFetched = true;
};


SessionStore.currentUser = function() {
  return Object.assign({}, _currentUser);
};

SessionStore.currentUserHasBeenFetched = function () {
  return !!_currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = function () {
  return !!_currentUser.id;
};

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.currentUser);
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _logout();
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
