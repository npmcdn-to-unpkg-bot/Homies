const AppDispatcher = require('../dispatcher/dispatcher.js');
const HouseApiUtil = require('../util/house_api_util.js');
const HouseConstants = require('../constants/house_constants.js');

const HouseActions = {
  createHouse: function (house) {
    HouseApiUtil.createHouse(house, HouseActions.addHouse);
  },
  addHouse: function (house) {
    AppDispatcher.dispatch({
      actionType: HouseConstants.ADD_HOUSE,
      house: house
    });
  },
  updateCurrentHouse: function (id) {
    HouseApiUtil.updateCurrentHouse(id, HouseActions.finishedUpdateCurrentHouse);
  },
  finishedUpdateCurrentHouse: function (house) {
    AppDispatcher.dispatch({
      actionType: HouseConstants.UPDATE_CURRENT_HOUSE,
      house: house
    });
  },
  updateCurrentHomies: function (houseId) {
    HouseApiUtil.updateCurrentHomies(HouseActions.finishedCurrentHomies);
  },
  finishedCurrentHomies: function (homies) {
    AppDispatcher.dispatch({
      actionType: HouseConstants.UPDATE_CURRENT_HOMIES,
      homies: homies
    });
  }
};

module.exports = HouseActions;
