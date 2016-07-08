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
    let newItem = document.getElementById("list-item").value;
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
      <div className="row">
        <form onSubmit={this.handleListSubmit}>
          <div className="row">
            <div className="input-field col s4">
              <input id="title"
                     type="title"
                     className="validate"
                     type="text"
                     value={this.state.title}
                     onChange={this.update("title")} />
              <label for="title">Title</label>
            </div>
            <div className="input-field col s4">
              <input id="description"
                     type="description"
                     className="validate"
                     type="text"
                     value={this.state.description}
                     onChange={this.update("description")} />
              <label for="description">Description</label>
            </div>
            <div className="col s4">
              <button className="btn waves-effect waves-light" type="submit" name="action">Save</button>
            </div>
          </div>
          <div className="row">
            <ul>
              {
                this.state.items.map(item => {
                  return (<li key={item}>{item}</li>);
                })
              }
            </ul>
          </div>
        </form>
        <div className="row">
          <form onSubmit={this.handleItemSubmit}>
            <div className="input-field col s5">
              <input id="list-item"
                     type="text"
                     value={this.state.currentListItemContent}
                     onChange={this.update("currentListItemContent")} />
              <label for="list-item">Add item...</label>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = ListForm;
