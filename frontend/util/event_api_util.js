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
      data: { evnt: { name: evnt.name, start_date: evnt.startDate, end_date: evnt.endDate, start_time: evnt.startTime, end_time: evnt.endTime}},
      success: function (response) {
        console.log('successfully created event');
        console.log(response);
        callback(response);
      },
      error: function (err) {
        console.log('error creating event');
        console.log(err);
      }
    });
  }
};

module.exports = EventApiUtil;
