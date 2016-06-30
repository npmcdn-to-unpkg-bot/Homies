const AppDispatcher = require('../dispatcher/dispatcher.js');
const JoinHouseApiUtil = require('../util/join_house_api_util.js');
const HouseConstants = require('../constants/house_constants.js');

const JoinHouseActions = {
  joinHouse: function (userID, houseID) {
    JoinHouseApiUtil.joinHouse(userID, houseID, JoinHouseActions.joinedHouse);
  },
  joinedHouse: function (house) {
    AppDispatcher.dispatch({
      actionType: HouseConstants.JOINED_HOUSE,
      house: house
    });
  }
};

module.exports = JoinHouseActions;
