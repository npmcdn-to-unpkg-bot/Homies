const React = require('react');

const ListShow = React.createClass({
  render: function () {
    console.log('list show render');
    console.log(this.props.listItems);

    const listItems = this.props.listItems;
    const listItemsJsx = listItems.map(item => {
      return (
        <li>
          {item.content}
        </li>
      )
    });



    const listItemKeys = Object.keys(this.props.listItems);
    let listItemJsx = listItemKeys.map(key => {
      return (<li>{this.props.listItems[key]}</li>);
    });
    console.log('list item jsx');
    console.log(listItemJsx);
    return (
      <div>
        <h4>{this.props.list.title}</h4>
        <ul>
          {listItemsJsx}
        </ul>
      </div>
    );
  }
});

module.exports = ListShow;
