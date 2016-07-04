const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ListStore = new Store(AppDispatcher);
const ListConstants = require('../constants/list_constants.js');

let _lists = {};

ListStore.all = function () {
  return _lists;
};

ListStore.getRecentlyUpdated = function () {
  const listKeys = Object.keys(_lists);
  const sortedDateObject = {};
  const dateArray = [];
  for (let i = 0; i < listKeys.length; i++) {
    dateArray.push(_lists[listKeys[i]].updated_at);
  }
  dateArray.sort(function (a, b) {
    return new Date(b) - new Date(a);
  });
  const updatedAtTarget  = dateArray.slice(0, 1)[0];
  const requestedList = [];
  for (let i = 0; i < listKeys.length; i++) {
    if (_lists[listKeys[i]].updated_at === updatedAtTarget) {
      return _lists[listKeys[i]];
    }
  }
};

function allLists (lists) {
  const listKeys = Object.keys(lists);
  for (let i = 0; i < listKeys.length; i++) {
    _lists[lists[listKeys[i]].id] = lists[listKeys[i]];
  }
}

function addList (list) {
  _lists[list.id] = list;
}

function updateList (list) {
  _lists[list.id] = list;
}

ListStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ListConstants.RECEIVE_HOUSES_LISTS:
      allLists(payload.lists);
      ListStore.__emitChange();
      break;
    case ListConstants.CREATED_LIST:
      addList(payload.list);
      ListStore.__emitChange();
      break;
    case ListConstants.UPDATED_LIST:
      updateList(payload.list);
      ListStore.__emitChange();
      break;
    case ListConstants.UPDATED_LIST_ITEM:
      ListStore.__emitChange();
      break;
  }
};

module.exports = ListStore;
