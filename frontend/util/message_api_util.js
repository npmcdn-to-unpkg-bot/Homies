const MessageApiUtil = {
  fetchMessages: function (callback) {
    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        console.log('successfully fetched messages!');
        callback(response);
      },
      error: function (err) {
        console.log('error');
        console.log(err);
      }
    });
  },
  createMessage: function (message, callback) {
    $.ajax({
      url: "api/messages",
      type: "POST",
      data: { message },
      success: function (response) {
        callback(message);
        console.log('successfully created message!');
      },
      error: function (err) {
        console.log('error :(');
        console.log(err);
      }
    });
  }
};

module.exports = MessageApiUtil;
