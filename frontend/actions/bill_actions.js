const AppDispatcher = require('../dispatcher/dispatcher.js');
const BillApiUtil = require('../util/bill_api_util.js');
const BillConstants = require('../constants/bill_constants.js');

const BillActions = {
  createBill: function (bill) {
    BillApiUtil.createBill(bill, BillActions.receiveCreatedBill);
  },
  receiveCreatedBill: function (bill) {
    console.log('receive created bill - bill actions (need to invoke app dispatcher)');
  },
  fetchBills: function () {
    BillApiUtil.fetchBills(BillActions.receiveFetchedBills);
  },
  receiveFetchedBills: function (bills) {
    console.log('successfully fetched - bill actions');
    console.log(bills);
    AppDispatcher.dispatch({
      actionType: BillConstants.FETCHED_ALL_BILLS,
      bills: bills
    });
  }
};

module.exports = BillActions;
