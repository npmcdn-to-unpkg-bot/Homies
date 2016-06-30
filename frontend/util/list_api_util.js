const ListApiUtil = {
  fetchHousesLists: function (callback) {
    $.ajax({
      url: "api/lists",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        // callback(response);
        console.log(response);
        console.log('successfully fetched all the lists!!');
      }
    });
  },
};

module.exports = ListApiUtil;
