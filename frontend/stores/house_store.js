const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const HouseConstants = require('../constants/house_constants.js');
const HouseStore = new Store(AppDispatcher);

let _houses = {};

function updateHouse (house) {
  _houses = house;
}

HouseStore.all = function () {
  return _houses;
};

function addHouse (house) {
  console.log("house store before: " + JSON.stringify(_houses));
  _houses[house.id] = house;
  console.log("house store after: " + JSON.stringify(_houses));
}

HouseStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case HouseConstants.ADD_HOUSE:
      addHouse(payload.house);
      // Don't need to emitChange here
      HouseStore.__emitChange();
      break;
    case HouseConstants.JOINED_HOUSE:
      HouseStore.__emitChange();
      break;
  }
};

module.exports = HouseStore;
