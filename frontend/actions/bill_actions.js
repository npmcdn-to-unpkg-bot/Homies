const AppDispatcher = require('../dispatcher/dispatcher.js');
const BillApiUtil = require('../util/bill_api_util.js');
const BillConstants = require('../constants/bill_constants.js');

const BillActions = {
  createBill: function (bill) {
    BillApiUtil.createBill(bill, BillActions.receiveCreatedBill);
  },
  receiveCreatedBill: function (bill) {
    console.log('receive created bill - bill actions');
  }
};

module.exports = BillActions;
