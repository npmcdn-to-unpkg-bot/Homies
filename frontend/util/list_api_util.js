const ListApiUtil = {
  fetchHousesLists: function (callback) {
    $.ajax({
      url: "api/lists",
      type: "GET",
      dataType: "JSON",
      success: function (response) {
        callback(response);
      },
    });
  },
  createList: function (list, callback) {
    $.ajax({
      url: "api/list_items",
      type: "POST",
      dataType: "JSON",
      data: { list: { title: list.title, description: list.description, list_items: list.items }},
      success: function (response) {
        callback(response);
      },
    });
  },
  updateList: function (list, newTitle, callback) {
    $.ajax({
      url: `api/lists/${list.id}`,
      type: "PATCH",
      dataType: "JSON",
      data: { list: { title: newTitle } },
      success: function (response) {
        callback(response);
      },
    });
  }
};

module.exports = ListApiUtil;
