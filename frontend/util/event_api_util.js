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
  }
};

module.exports = EventApiUtil;
