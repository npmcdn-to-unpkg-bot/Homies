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
  },
  fetchUrgentBills: function (callback) {
    $.ajax({
      url: "api/bills/urgent",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        console.log('successfully fetched urgent bills');
        callback(response);
      },
      error: function (err) {
        console.log('error fetching urgent bills');
        console.log(err);
      }
    });
  },
  fetchThisMonthBills: function (callback) {
    $.ajax({
      url: "api/bills/thisMonth",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        callback(response);
      },
      error: function (err) {
        console.log('error fetching completed this month');
        console.log(err);
      }
    });
  },
  toggleCompleted: function (bill, newStatus, callback) {
    $.ajax({
      url: `api/bills/${bill.id}`,
      type: "PATCH",
      dataType: "JSON",
      data: { bill: { completed: newStatus }},
      success: function (bill) {
        console.log('successfully patched bill');
        callback(bill);
      },
      error: function (err) {
        console.log('error patching bill');
        console.log(err);
      }
    })
  }
};

module.exports = BillApiUtil;
