const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ListStore = new Store(AppDispatcher);

let _lists = {};

ListStore.fetchLists = function () {

};

function allLists (lists) {
  _lists = lists;
};

ListStore.__onDispatch = function (payload) {

};

module.exports = ListStore;
