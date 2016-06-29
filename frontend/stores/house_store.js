const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const HouseConstants = require('../constants/house_constants.js');
const HouseStore = new Store(AppDispatcher);

let _house = {};
let _housemates = {};

function updateHouse (house) {
  _house = house;
};

HouseStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case HouseConstants.HOUSE_RECEIVED:
      updateHouse(payload.house);
      HouseStore.__emitChange();
      break;
    case HouseConstants.HOUSEMATE_RECEIVED:

      break;
  }
};

module.exports = HouseStore;
