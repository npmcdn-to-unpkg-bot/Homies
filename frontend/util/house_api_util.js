const HouseApiUtil = {
  createHouse: function (house, callback) {
    $.ajax({
      url: "api/houses",
      type: "POST",
      data: { house: house },
      success: function (response) {
        callback(response);
      }
    });
  },
  updateCurrentHouse: function (id, callback) {
    $.ajax({
      url: `api/houses/${id}`,
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        callback(response);
      }
    });
  },
  updateCurrentHomies: function (callback) {
    $.ajax({
      url: `api/houses`,
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        callback(response);
      }
    });
  }
};

module.exports = HouseApiUtil;
