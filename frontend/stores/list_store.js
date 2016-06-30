const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ListStore = new Store(AppDispatcher);
const ListConstants = require('../constants/list_constants.js');

let _lists = {};

ListStore.all = function () {
  return _lists;
};

function allLists (lists) {
  const listKeys = Object.keys(lists);
  for (let i = 0; i < Object.keys(lists).length; i++) {
    _lists[lists[listKeys[i]].id] = lists[listKeys[i]];
  }
}

ListStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ListConstants.RECEIVE_HOUSES_LISTS:
      allLists(payload.lists);
      ListStore.__emitChange();
      break;
  }
};

module.exports = ListStore;
