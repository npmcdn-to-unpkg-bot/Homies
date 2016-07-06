const EventApiUtil = {
  fetchEvents: function (callback) {
    $.ajax({
      url: "api/events",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        console.log('successfully fetched events');
        console.log(response);
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
        console.log('successfully created event');
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
