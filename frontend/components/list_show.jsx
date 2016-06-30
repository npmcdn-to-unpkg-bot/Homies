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
      <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header">{this.props.list.title}</div>
          <div className="collapsible-body">
            <ul>
              {listItemsJsx}
            </ul>
          </div>
        </li>
      </ul>
    );
  }
});

module.exports = ListShow;
