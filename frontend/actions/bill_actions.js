const AppDispatcher = require('../dispatcher/dispatcher.js');
const BillApiUtil = require('../util/bill_api_util.js');
const BillConstants = require('../constants/bill_constants.js');

const BillActions = {
  createBill: function (bill) {
    BillApiUtil.createBill(bill, BillActions.receiveCreatedBill);
  },
  receiveCreatedBill: function (bill) {
    console.log('receive created bill - bill actions (need to invoke app dispatcher)');
    AppDispatcher.dispatch({
      actionType: BillConstants.CREATED_BILL,
      bill: bill
    });
  },
  fetchBills: function () {
    BillApiUtil.fetchBills(BillActions.receiveFetchedBills);
  },
  receiveFetchedBills: function (bills) {
    AppDispatcher.dispatch({
      actionType: BillConstants.FETCHED_ALL_BILLS,
      bills: bills
    });
  },
  fetchUrgentBills: function () {
    BillApiUtil.fetchUrgentBills(BillActions.receiveUrgentBills);
  },
  receiveUrgentBills: function (bills) {
    AppDispatcher.dispatch({
      actionType: BillConstants.FETCHED_URGENT_BILLS,
      bills: bills
    });
  },
  fetchCompletedThisMonthBills: function () {
    BillApiUtil.fetchCompletedThisMonthBills(BillActions.receiveCompletedBills);
  },
  receiveCompletedBills: function (bills) {
    AppDispatcher.dispatch({
      actionType: BillConstants.FETCHED_COMPLETED_THIS_MONTH,
      bills: bills
    });
  }
};

module.exports = BillActions;
