const SessionApiUtil = {
  login: function (user, callback, errorCallback) {
    $.ajax({
      url: "api/session",
      type: "POST",
      data: {user},
      success: function (response) {
        callback(response);
      },
    });
  },
  signup: function (user, callback, error) {
    $.ajax({
      url: "api/users",
      type: "POST",
      dataType: "JSON",
      data: { user },
      success: function (response) {
        callback(response)
      },
    });
  },
  logout: function (callback, error) {
    $.ajax({
			url: 'api/session',
			method: 'DELETE',
			success: function (response) {
        callback(response);
      },
		});
  },
  fetchCurrentUser: function () {
    $.ajax({
			url: '/api/session',
			method: 'GET',
			success: function (response) {
        console.log('success');
        console.log(response);
      },
			error: function (err) {
        console.log('error');
			  console.log(err);
			},
    })
  }
};

module.exports = SessionApiUtil;
