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
  findHouse: function (id) {
    HouseApiUtil.findHouse(id, HouseActions.foundHouse);
  },
  foundHouse: function (house) {
    AppDispatcher.dispatch({

    });
  }
};

module.exports = HouseActions;
