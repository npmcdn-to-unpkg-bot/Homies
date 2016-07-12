const BillApiUtil = {
  createBill: function (bill, callback) {
    $.ajax({
      url: "api/bills",
      type: "POST",
      dataType: "JSON",
      data: { bill: { description: bill.description, amount: bill.amount, due_date: bill.dueDate, users: bill.users}},
      success: function (response) {
        callback(response);
      },
    });
  },
  fetchBills: function (callback) {
    $.ajax({
      url: "api/bills",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        console.log('SUCCESS');
        console.log(response);
        callback(response);
      },
      error: function (err) {
        console.log('error');
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
        callback(response);
      },
    });
  },
  fetchThisMonthBills: function (callback) {
    $.ajax({
      url: "api/bills/thisMonth",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        callback(response);
      }
    });
  },
  toggleCompleted: function (bill, newStatus, callback) {
    $.ajax({
      url: `api/bills/${bill.id}`,
      type: "PATCH",
      dataType: "JSON",
      data: { bill: { completed: newStatus }},
      success: function (response) {
        callback(response);
      },
    });
  }
};

module.exports = BillApiUtil;
