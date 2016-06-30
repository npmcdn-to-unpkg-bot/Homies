const JoinHouseApiUtil = {
  joinHouse: function (userID, houseID, callback) {
    $.ajax({
      url: `api/users/${userID}`,
      type: "PATCH",
      data: { house_id: houseID },
      success: function (response) {
        callback(response)
        console.log('success');
      },
      error: function (err) {
        console.log('error');
        console.log(err);
      }
    });
  }
};

module.exports = JoinHouseApiUtil;
