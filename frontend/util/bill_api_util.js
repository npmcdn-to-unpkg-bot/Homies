const BillApiUtil = {
  createBill: function (bill, callback) {
    $.ajax({
      url: "api/bills",
      type: "POST",
      dataType: "JSON",
      data: { bill: { description: bill.description, amount: bill.amount, due_date: bill.dueDate, users: bill.users}},
      success: function (response) {
        console.log('successfully created the bill!');
        callback(response);
      },
      error: function (err) {
        console.log('error creating the bill');
        console.log(err);
      }
    });
  },
  fetchBills: function (callback) {
    $.ajax({
      url: "api/bills",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        console.log('succes!');
        callback(response);
      },
      error: function (err) {
        console.log('error fetching bills');
        console.log(err);
      }
    });
  }
};

module.exports = BillApiUtil;
