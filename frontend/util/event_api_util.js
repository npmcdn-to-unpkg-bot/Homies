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
  },
  createEvent: function (evnt, callback) {
    $.ajax({
      url: "api/events",
      type: "POST",
      dataType: "JSON",
      data: { evnt: { name: evnt.name, start_date: evnt.startDate, end_date: evnt.endDate }},
      success: function (response) {
        callback(response);
      }
    });
  },
  deleteEvent: function (evnt, callback) {
    $.ajax({
      url: `api/events/${evnt.id}`,
      type: "DELETE",
      dataType: "JSON",
      success: function (response) {
        callback(response);
      },
    });
  },
  fetchUpcomingEvents: function (callback) {
    $.ajax({
      url: "api/events/upcomingThisMonth",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        callback(response)
      },
      error: function (err) {
        console.log('error fetchUpcomingEvents');
        console.log(err);
      }
    })
  }
};

module.exports = EventApiUtil;
