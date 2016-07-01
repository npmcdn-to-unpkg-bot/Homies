const ListApiUtil = {
  fetchHousesLists: function (callback) {
    $.ajax({
      url: "api/lists",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        callback(response);
      },
      error: function (err) {
        console.log('error');
        console.log(err);
      }
    });
  },
  createList: function (list, callback) {
    $.ajax({
      url: "api/list_items",
      type: "POST",
      dataType: "JSON",
      data: { list: { title: list.title, description: list.description, list_items: list.items }},
      success: function (response) {
        console.log('succsessfully created a list!');
        console.log(response);
        callback(response)
      },
      error: function (err) {
        console.log('error creating a hosue');
        console.log(err);
      }
    });
  }
};

module.exports = ListApiUtil;
