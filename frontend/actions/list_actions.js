const AppDispatcher = require('../dispatcher/dispatcher.js');
const ListApiUtil = require('../util/list_api_util.js');
const ListConstants = require('../constants/list_constants.js');

const ListActions = {
  fetchHousesLists: function () {
    ListApiUtil.fetchHousesLists(ListActions.receiveHousesLists);
  },
  receiveHousesLists: function (lists) {
    console.log('house_actions::addHouse');
    AppDispatcher.dispatch({
      actionType: ListConstants.RECEIVE_HOUSES_LISTS,
      lists: lists
    });
  }
};

module.exports = ListActions;
