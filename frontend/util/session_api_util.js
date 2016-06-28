const SessionApiUtil = {
  login: function (user, callback, errorCallback) {
    $.ajax({
      url: "api/session",
      type: "POST",
      data: {user},
      success: function (response) {
        callback(response);
        console.log('successful login!');
      },
      error: function (xhr) {
				const errors = xhr.responseJSON;
				errorCallback("login", errors);
			}
    });
  },
  signup: function (user, callback, error) {
    $.ajax({
      url: "api/users",
      type: "POST",
      dataType: "JSON",
      data: { user },
      success: function (response) {
        console.log('successful signup!');
        callback(response)
      },
      error: function (xhr) {
				const errors = xhr.responseJSON;
				error("signup", errors);
			}
    });
  },
  logout: function (callback, error) {
    $.ajax({
			url: 'api/session',
			method: 'DELETE',
			success: function (response) {
        console.log('successful logout!');
        callback(response);
      },
			error: function (err) {

        console.log(err);
			  console.log("Logout error in SessionApiUtil#logout");
			}
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
