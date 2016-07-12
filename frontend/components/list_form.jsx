const React = require('react');
const ListStore = require('../stores/list_store.js');
const ListItemForm = require('./list_item_form.jsx');
const ListActions = require('../actions/list_actions.js');

const ListForm = React.createClass({
  getInitialState: function () {
    return {
      title: "",
      description: "",
      items: [],
      currentListItemContent: ""
    };
  },
  handleListSubmit: function (e) {
    console.log('handle list submit');
    e.preventDefault();
    const formData = {
      title: this.state.title,
      description: this.state.description,
      items: this.state.items
    };
    if (formData.title !== "") {
      ListActions.createList(formData);
      ListActions.fetchHousesLists();
    }
    this.setState({
      title: "",
      description: "",
      items: []
    });
  },
  handleItemSubmit: function (e) {
    e.preventDefault();
    const newItem = this.state.currentListItemContent;
    if (newItem !== "") {
      this.setState({
        items: this.state.items.concat([newItem]),
        currentListItemContent: ""
      });
    }
  },
  update: function (property) {
    return (e) => this.setState({ [property]: e.target.value });
  },
  render: function () {
    return (
      <div className="row list-form">
        <form>
          <div className="row">
            <h5><center>Create New List</center></h5><br />
            <div className="input-field col s12">
              <input id="title"
                     type="title"
                     className="validate"
                     type="text"
                     value={this.state.title}
                     onChange={this.update("title")} />
              <label for="title">Title</label>
            </div>
          </div>
          <div className="row">
            <ul>
              {
                this.state.items.map(item => {
                  return (<center><li key={item}>{item}</li></center>);
                })
              }
            </ul>
          </div>
        </form>
        <div className="row">
          <form onSubmit={this.handleItemSubmit}>
            <div className="input-field col s12">
              <input id="list-item"
                     type="text"
                     value={this.state.currentListItemContent}
                     onChange={this.update("currentListItemContent")} />
              <label for="list-item">Add item...</label>
            </div>
          </form>
          <div className="col s4">
            <button className="btn waves-effect waves-light"     type="submit" name="action" onClick={this.handleListSubmit}>Save</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ListForm;
