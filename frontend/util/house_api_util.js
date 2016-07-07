const HouseApiUtil = {
  createHouse: function (house, callback) {
    $.ajax({
      url: "api/houses",
      type: "POST",
      data: { house: house },
      success: function (response) {
        callback(response);
        console.log('successfully created a house!');
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
      },
      error: function (err) {
        console.log('error updating current house');
        console.log(err);
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
      },
      error: function (err) {
        console.log('error udpating current homies');
        console.log(err);
      }
    });
  }
};

module.exports = HouseApiUtil;
