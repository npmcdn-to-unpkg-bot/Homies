const MessageApiUtil = {
  fetchMessages: function (callback) {
    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        callback(response);
      }
    });
  },
  createMessage: function (message, callback) {
    $.ajax({
      url: "api/messages",
      type: "POST",
      data: { message },
      success: function (response) {
        callback(response);
      }
    });
  }
};

module.exports = MessageApiUtil;
