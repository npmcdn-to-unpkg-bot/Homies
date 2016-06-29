const AppDispatcher = require('../dispatcher/dispatcher.js');
const HouseApiUtil = require('../util/house_api_util.js');
const HouseConstants = require('../constants/house_constants.js');

const HouseActions = {
  createHouse: function (house) {
    HouseApiUtil.createHouse(house, HouseActions.receiveHouse);
  },
  receiveHouse: function (house) {
    AppDispatcher.dispatch({
      actionType: HouseConstants.HOUSE_RECEIVED,
      house: house
    });
  }
};

module.exports = HouseActions;
