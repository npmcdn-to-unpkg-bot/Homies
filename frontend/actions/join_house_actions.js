const JoinHouseActions = {
  joinHouse: function (userID, houseID) {
    $.ajax({
      url: `api/users/${userID}`,
      type: "PATCH",
      data: { house_id: houseID },
      success: function (response) {
        console.log(response);
        console.log('success');
      },
      error: function (err) {
        console.log('error');
        console.log(err);
      }
    });
  }
};

module.exports = JoinHouseActions;
