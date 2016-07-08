const React = require('react');
const BillActions = require('../actions/bill_actions.js');
const HouseActions = require('../actions/house_actions.js');
const HouseStore = require('../stores/house_store.js');
const BillStore = require('../stores/bill_store.js');
const BillStatus = require('./bill_status.jsx');

const Bill = React.createClass({
  getInitialState: function () {
    return {
      homies: HouseStore.currentHomies(),
      allBills: BillStore.all(),
      urgentBills: BillStore.urgentBills(),
      thisMonthBills: BillStore.thisMonthBills()
    };
  },
  componentWillMount: function () {
    BillActions.fetchBills();
    BillActions.fetchUrgentBills();
    BillActions.fetchThisMonthBills();
    this.houseListener = HouseStore.addListener(this.updateHomies);
    this.billListener = BillStore.addListener(this.updateBills);
  },
  componentWillUnmount: function () {
    this.houseListener.remove();
    this.billListener.remove();
  },
  updateBills: function () {
    this.setState({
      allBills: BillStore.all(),
      urgentBills: BillStore.urgentBills(),
      thisMonthBills: BillStore.thisMonthBills()
    });
  },
  updateHomies: function () {
    this.setState({ homies: HouseStore.currentHomies() });
  },
  addBill: function () {
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
  urgentBillsJsx: function () {
    const urgentBills = this.state.urgentBills;
    const urgentBillsKeys = Object.keys(urgentBills);
    let urgentBillsJsx;
    let billSum = 0;
    let earliestDueDateDay = 31;
    let earliestDueDate;
    if (urgentBillsKeys.length > 0) {
      urgentBillsKeys.forEach(key => {
        billSum += urgentBills[key].amount;
      });
      return (
        <div>
          <h5>Total Amount ${billSum.toFixed(2)}</h5>
        </div>
      );
    } else {
      return (<h5>You've paid all your bills!</h5>);
    }
  },
  formatDateObject: function (dateStr) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date(dateStr);
    const monthDue = dateObj.getUTCMonth();
    const dayDue = dateObj.getDate();
    const yearDue = dateObj.getFullYear();
    return `${monthNames[monthDue]} ${dayDue}, ${yearDue}`;
  },
  dueThisMonthJsx: function () {
    const thisMonthBills = this.state.thisMonthBills;
    const thisMonthBillsKeys = Object.keys(thisMonthBills);
    let thisMonthBillsJsx;
    if (thisMonthBillsKeys.length > 0) {
      return thisMonthBillsKeys.map(key => {
        const bill = thisMonthBills[key];
        return (
          <tr key={bill.id}>
            <td>{bill.description}</td>
            <td>{bill.amount}</td>
            <td>{this.formatDateObject(bill.due_date)}</td>
            <td><BillStatus bill={bill} completed={bill.completed}/></td>
          </tr>
        );
      });
    } else {
      return "One second while loading!";
    }
  },
  render: function () {
    return (
      <div>
        <div className="bill-view-container">
          <div className="row center urgent-bills">
            {this.urgentBillsJsx()}
          </div>
        </div>
        <div className="row">
          <div className="col s12 m5">
            <div className="card grey lighten-4">
              <div className="card-content">
                This Month
                <hr />
                <table className="centered">
                  <thead>
                    <tr>
                      <th data-field="description">Description</th>
                      <th data-field="amount">Amount</th>
                      <th data-field="due">Due</th>
                      <th data-field="status">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.dueThisMonthJsx()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col s12 m7">
            <div className="card grey lighten-4">
              <div className="card-content">
                Lifetime
                <hr />
              </div>
            </div>
          </div>
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
