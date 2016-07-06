const BillApiUtil = {
  createBill: function (bill, callback) {
    console.log('bill');
    console.log(bill);
    $.ajax({
      url: "api/bills",
      type: "POST",
      dataType: "JSON",
      data: { bill: { description: bill.description, amount: bill.amount, due_date: bill.dueDate}},
      success: function (response) {
        console.log('successfully created the bill!');
        callback(response);
      },
      error: function (err) {
        console.log('error creating the bill');
        console.log(err);
      }
    });
  }
};

module.exports = BillApiUtil;
