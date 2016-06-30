const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ListStore = new Store(AppDispatcher);
const ListConstants = require('../constants/list_constants.js');

let _lists = {};

ListStore.all = function () {
  return _lists;
};

function allLists (lists) {
  _lists = lists;
};

ListStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ListConstants.RECEIVE_HOUSES_LISTS:
      allLists(payload.lists);
      ListStore.__emitChange();
      break;
  }
};

module.exports = ListStore;
