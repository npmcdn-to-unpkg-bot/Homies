const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const BillConstants = require('../constants/bill_constants.js');
const BillStore = new Store(AppDispatcher);

let _bills = {};

function updateAllBills (bills) {
  _bills = bills;
}

BillStore.all = function () {
  return _bills;
};

BillStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case BillConstants.UPDATE_ALL_BILLS:
      updateAllBills(payload.bills);
      BillStore.__emitChange();
      break;
    }
};

module.exports = BillStore;
