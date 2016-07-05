const EventApiUtil = {
  fetchEvents: function (callback) {
    $.ajax({
      url: "api/events",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        callback(response);
      }
    });
  }
};

module.exports = EventApiUtil;
