const ListApiUtil = {
  fetchHousesLists: function (callback) {
    $.ajax({
      url: "api/lists",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        callback(response);
      },
      error: function (err) {
        console.log('error');
        console.log(err);
      }
    });
  },
};

module.exports = ListApiUtil;
