const ListItemApiUtil = {
  updateListItem: function (item, content, callback) {
    $.ajax({
      url: `api/list_items/${item.id}`,
      method: "PATCH",
      dataType: "JSON",
      data: { item: { content: content } },
      success: function (response) {
        callback(response);
      }
    });
  }
};

module.exports = ListItemApiUtil;
