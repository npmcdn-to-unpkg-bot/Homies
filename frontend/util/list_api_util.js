const ListApiUtil = {
  fetchHousesLists: function (callback) {
    console.log('gotta seee ya 2');
    $.ajax({
      url: "api/lists",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        callback(response);
        console.log('successfully fetched all the lists!!');
      },
      error: function (err) {
        console.log('error');
        console.log(err);
      }
    });
  },
};

module.exports = ListApiUtil;
