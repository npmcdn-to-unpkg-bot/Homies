const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const BillConstants = require('../constants/bill_constants.js');
const BillStore = new Store(AppDispatcher);

let _bills = {};
let _urgentBills = {};
let _thisMonthBills = {};

function updateAllBills (bills) {
  _bills = bills;
}

function updateThisMonth (bills) {
  _thisMonthBills = bills;
}

function updateUrgentBills (bills) {
  _urgentBills = bills;
}

function addBill (bill) {
  _bills[bill.id] = bill;
  const billDateObj = new Date(bill.due_date);
  const billMonth = billDateObj.getMonth();
  const currentMonth = new Date().getMonth();
  if (billMonth === currentMonth) {
    _thisMonthBills[bill.id] = bill;
  }
}

function updateSingleBill (bill) {
  const urgentBillsKeys = Object.keys(_urgentBills);
  if (bill.completed) {
    delete _urgentBills[bill.id];
  } else {
    _urgentBills[bill.id] = bill;
  }
}

BillStore.all = function () {
  return _bills;
};

BillStore.thisMonthBills = function () {
  return _thisMonthBills;
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
    case BillConstants.FETCHED_THIS_MONTH:
      updateThisMonth(payload.bills);
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
    case BillConstants.TOGGLE_COMPLETED:
      updateSingleBill(payload.bill);
      BillStore.__emitChange();
      break;
  }
};

module.exports = BillStore;
