const AppDispatcher = require('../dispatcher/dispatcher.js');
const ListApiUtil = require('../util/list_api_util.js');
const ListConstants = require('../constants/list_constants.js');

const ListActions = {
  fetchHousesLists: function () {
    ListApiUtil.fetchHousesLists(ListActions.receiveHousesLists);
  },
  receiveHousesLists: function (lists) {
    AppDispatcher.dispatch({
      actionType: ListConstants.RECEIVE_HOUSES_LISTS,
      lists: lists
    });
  },
  createList: function (list) {
    ListApiUtil.createList(list, ListActions.receiveList);
  },
  receiveList: function (list) {
    AppDispatcher.dispatch({
      actionType: ListConstants.CREATED_LIST,
      list: list
    });
  },
  updateList: function (list, newTitle) {
    ListApiUtil.updateList(list, newTitle, ListActions.receiveUpdate);
  },
  receiveUpdate: function (list) {
    AppDispatcher.dispatch({
      actionType: ListConstants.UPDATED_LIST,
      list: list
    });
  }
};

module.exports = ListActions;
