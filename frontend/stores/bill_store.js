const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const BillConstants = require('../constants/bill_constants.js');
const BillStore = new Store(AppDispatcher);

let _bills = {};
let _urgentBills = {};
let _completedThisMonthBills = {};

function updateAllBills (bills) {
  _bills = bills;
}

function updateCompletedThisMonth (bills) {
  _completedThisMonthBills = bills;
}

function updateUrgentBills (bills) {
  _urgentBills = bills;
}

function addBill (bill) {
  _bills[bill.id] = bill;
}

BillStore.all = function () {
  return _bills;
};

BillStore.completedThisMonth = function () {
  return _completedThisMonthBills;
};

BillStore.urgentBills = function () {
  return _urgentBills;
};

BillStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case BillConstants.UPDATE_ALL_BILLS:
      updateAllBills(payload.bills);
      BillStore.__emitChange();
      break;
    case BillConstants.FETCHED_COMPLETED_THIS_MONTH:
      updateCompletedThisMonth(payload.bills);
      BillStore.__emitChange();
      break;
    case BillConstants.FETCHED_URGENT_BILLS:
      updateUrgentBills(payload.bills);
      BillStore.__emitChange();
      break;
    case BillConstants.CREATED_BILL:
      addBill(payload.bill);
      BillStore.__emitChange();
      break;
  }
};

module.exports = BillStore;
