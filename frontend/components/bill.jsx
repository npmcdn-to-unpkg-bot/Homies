const React = require('react');
const BillActions = require('../actions/bill_actions.js');
const HouseActions = require('../actions/house_actions.js');
const HouseStore = require('../stores/house_store.js');
const BillStore = require('../stores/bill_store.js');

const Bill = React.createClass({
  getInitialState: function () {
    return {
      homies: HouseStore.currentHomies(),
      bills: BillStore.all()
    }
  },
  componentWillMount: function () {
    BillActions.fetchBills();
    this.houseListener = HouseStore.addListener(this.updateHomies);
    this.billListener = BillStore.addListener(this.updateBills);
  },
  componentWillUnmount: function () {
    this.houseListener.remove();
    this.billListener.remove();
  },
  updateBills: function () {
    this.setState({
      bills: BillStore.all()
    });
  },
  updateHomies: function () {
    this.setState({ homies: HouseStore.currentHomies() });
  },
  addBill: function (houseMemebers) {
    const messagePrompt = `<h5>Create new bill</h5>`;
    vex.dialog.buttons.YES.text = "Create"
    let inputFields = "<input type='text' placeholder='Description' name='bill[description]' class='vex-input' id='bill-input-description'/>&nbsp;<input placeholder='Amt (53.11)' type='text' name='bill[amount]' id='bill-input-amount'/><br /><input placeholder='Due date (e.g. 03/08/2016)' type='date' name='bill[dueDate]' id='datepicker'><br />Charged to:<br />";
    const homies = this.state.homies;
    const homieKeys = Object.keys(homies);
    for (let i = 0; i < homieKeys.length; i++) {
      inputFields += `<input type='checkbox' class='filled-in' id='${homies[homieKeys[i]].f_name}' checked='checked' name='bill[user]' value='${homies[homieKeys[i]].id}' /><label for='${homies[homieKeys[i]].f_name}'>${homies[homieKeys[i]].f_name}</label><br />`;
    }
    vex.dialog.prompt({
      message: messagePrompt,
      input: inputFields,
      callback: function (response) {
        console.log('response');
        console.log(response);
        if (response) {
          const formData = {
            description: response["bill[description]"],
            amount: response["bill[amount]"],
            dueDate: response["bill[dueDate]"],
            users: response["bill[user]"]
          };
          BillActions.createBill(formData);
        }
      }
    });
  },
  render: function () {
    console.log('bill rendering');
    console.log(HouseStore.currentHomies());
    return (
      <div>
        <div className="row center bill-view-container">
          aggregate data here
        </div>
        <div className="row">
          <div className="col s12 m5">
            <a className="btn-floating btn-small waves-effect waves-light red">
              <i className="material-icons" onClick={this.addBill}>add</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Bill;
