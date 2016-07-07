const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const HouseConstants = require('../constants/house_constants.js');
const SessionConstants = require('../constants/session_constants.js');
const HouseStore = new Store(AppDispatcher);

let _houses = {};
let _currentHouse = {};
let _currentHomies = {};

function updateHouse (house) {
  _houses = house;
}

function updateCurrentHouse (house) {
  _currentHouse = house;
}

function updateCurrentHomies (homies) {
  console.log('updating current homies');
  console.log(homies);
  _currentHomies = homies;
}

HouseStore.currentHomies = function () {
  return _currentHomies;
};

HouseStore.currentHouse = function () {
  return _currentHouse;
};
HouseStore.all = function () {
  return _houses;
};

function addHouse (house) {
  _houses[house.id] = house;
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
    case HouseConstants.UPDATE_CURRENT_HOUSE:
      updateCurrentHouse(payload.house);
      HouseStore.__emitChange();
      break;
    case HouseConstants.UPDATE_CURRENT_HOMIES:
      updateCurrentHomies(payload.homies);
      HouseStore.__emitChange();
      break;
  }
};

module.exports = HouseStore;
