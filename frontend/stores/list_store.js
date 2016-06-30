const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ListStore = new Store(AppDispatcher);
const ListConstants = require('../constants/list_constants.js');

let _lists = {};

ListStore.all = function () {
  return _lists;
};

function allLists (lists) {
  for (let i = 0; i < lists.length; i++) {
    _lists[lists[i].id] = lists[i]
  }
};

ListStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ListConstants.RECEIVE_HOUSES_LISTS:
      console.log('wooo');
      allLists(payload.lists);
      ListStore.__emitChange();
      break;
  }
};

module.exports = ListStore;
