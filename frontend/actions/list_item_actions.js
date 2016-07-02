const AppDispatcher = require('../dispatcher/dispatcher.js');
const ListItemApiUtil = require('../util/list_item_api_util.js');
const ListConstants = require('../constants/list_constants.js');

const ListItemActions = {
  updateListItem: function (item, content) {
    ListItemApiUtil.updateListItem(item, content, ListItemActions.receiveUpdate);
  },
  /*
  Note: Only going to dispatch this action type and update the ListStore, which
        will force the lists to re-render, thus the listItems will also re-render
  */
  receiveUpdate: function () {
    AppDispatcher.dispatch({
      actionType: ListConstants.UPDATED_LIST_ITEM
    });
  }
};

module.exports = ListItemActions;
