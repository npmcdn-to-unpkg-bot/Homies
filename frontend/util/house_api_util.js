const HouseApiUtil = {
  createHouse: function (house, callback) {
    $.ajax({
      url: "api/houses",
      type: "POST",
      data: { house: house },
      success: function (response) {
        callback(response)
        console.log('successfully created a house!');
        console.log(response);
      },
      error: function (err) {
        console.log('error!');
        console.log(err);
      }
    })
  },
};

module.exports = HouseApiUtil;
