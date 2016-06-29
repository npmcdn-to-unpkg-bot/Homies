const HouseApiUtil = {
  createHouse: function (house, callback) {
    $.ajax({
      url: "api/houses",
      type: "POST",
      data: { house: house },
      success: function (response) {
        // console.log(callback);
        callback(response);
        console.log('successfully created a house!');
      },
      error: function (err) {
        console.log('error!');
        console.log(err);
      }
    })
  },
};

module.exports = HouseApiUtil;
