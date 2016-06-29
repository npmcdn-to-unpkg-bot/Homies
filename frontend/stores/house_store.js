const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const HouseConstants = require('../constants/house_constants.js');
const HouseStore = new Store(AppDispatcher);
//
// let _house = {};
// let _housemates = {};

// function updateHouse (house) {
//   _house = house;
// };
//
// function addHouse (house) {
//   _house[house.id] = house;
// };

HouseStore.__onDispatch = function (payload) {
  console.log('ondispatch');
  // switch (payload.actionType) {
  //   case HouseConstants.ADD_HOUSE:
  //     addHouse(payload.house);
  //     debugger;
  //     // Don't need to emitChange here
  //     // HouseStore.__emitChange();
  //     break;
  //   case HouseConstants.HOUSEMATE_RECEIVED:
  //
  //     break;
  // }
};

module.exports = HouseStore;
