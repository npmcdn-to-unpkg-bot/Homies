const React = require('react');

const ListShow = React.createClass({
  getInitialState: function () {
    return {
      titleEditMode: false
    }
  },
  render: function () {
    const listItems = this.props.listItems;
    let listItemsJsx;
    if (!listItems) {
      listItemsJsx = "You have no items on this list!";
    } else {
      listItemsJsx = listItems.map(item => {
        return (
          <li key={item.id}>
            {item.content}
          </li>
        );
      });
    }
    return (
      <div className="">
        <h5 onDoubleClick={this.omg}>{this.props.list.title}</h5>
        <ul>
          {listItemsJsx}
        </ul>
      </div>
    );
  }
});

module.exports = ListShow;
