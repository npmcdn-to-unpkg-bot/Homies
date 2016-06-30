const React = require('react');

const ListShow = React.createClass({
  render: function () {
    return (
      <ul>
        <li>
          {this.props.list.title}
        </li>
      </ul>
    );
  }
});

module.exports = ListShow;
