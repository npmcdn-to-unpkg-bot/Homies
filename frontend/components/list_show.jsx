const React = require('react');

const ListShow = React.createClass({
  render: function () {
    const listItems = this.props.listItems;
    let listItemsJsx = listItems.map(item => {
      return (
        <li key={item.id}>
          {item.content}
        </li>
      );
    });

    if (listItems.length === 0) {
      listItemsJsx = "You have no items on this list!";
    }
    return (
      <div>
        <blockquote>{this.props.list.title}</blockquote>
        <ul>
          {listItemsJsx}
        </ul>
      </div>
    );
  }
});

module.exports = ListShow;
