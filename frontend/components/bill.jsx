const React = require('react');
const BillActions = require('../actions/bill_actions.js');
const HouseActions = require('../actions/house_actions.js');
const HouseStore = require('../stores/house_store.js');
const BillStore = require('../stores/bill_store.js');
const BillStatus = require('./bill_status.jsx');
const Link = require('react-router').Link;

const Bill = React.createClass({
  getInitialState: function () {
    return {
      dashboardView: true,
      homies: HouseStore.currentHomies(),
      allBills: BillStore.all(),
      urgentBills: BillStore.urgentBills(),
      thisMonthBills: BillStore.thisMonthBills()
    };
  },
  componentWillMount: function () {
    if (this.props.location && this.props.location.pathname === "/bills") {
      this.setState({ dashboardView: false });
    }
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
  componentDidMount: function () {
    if (this.props.location && this.props.location.pathname === "/bills") {
      $('div.bills').css('width', '100%');
      $('div.bills').css('display', 'flex');
      $('div.bills').css('justify-content', 'center');
    }
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
  urgentBillsAmount: function () {
    const urgentBills = this.state.urgentBills;
    const urgentBillsKeys = Object.keys(urgentBills);
    let urgentBillsJsx;
    let billSum = 0;
    if (urgentBillsKeys.length > 0) {
      urgentBillsKeys.forEach(key => {
        billSum += urgentBills[key].amount;
      });
      return (
        <div>
          <p>You have bills that have not yet been paid!</p>
          <h5>Amount you owe:<br /> ${billSum.toFixed(2)}</h5>
        </div>
      );
    } else {
      return ("You've paid all your bills!");
    }
  },
  urgentBillsJsx: function () {
    const urgentBills = this.state.urgentBills;
    const urgentBillsKeys = Object.keys(urgentBills);
    let urgentBillsJsx;
    let billSum = 0;
    if (urgentBillsKeys.length > 0) {
      urgentBillsKeys.forEach(key => {
        billSum += urgentBills[key].amount;
      });
      return (
        <div className="col s12 m12">
          <h5><center>You owe: ${billSum.toFixed(2)}</center></h5><br />
            <a className="waves-effect waves-light btn" onClick={this.addBill}><i className="material-icons right">add</i>Add Bill</a>
        </div>
      );
    } else {
      return (
        <div className="col s12 m12">
          <h5>You've paid all your bills!</h5><br />
            <a className="waves-effect waves-light btn" onClick={this.addBill}><i className="material-icons right">add</i>Add Bill</a>
        </div>
      );
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
  formatBillsJsx: function (bills) {
    const billsKeys = Object.keys(bills);
    let billsJsx;
    if (billsKeys.length > 0) {
      return billsKeys.map(key => {
        const bill = bills[key];
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
      return "";
    }
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
      return "";
    }
  },
  billView: function () {
    if (this.state.dashboardView) {
      return (
        <div className="dashboard-bills">
          <div className="bill-wrap">
            <div className="top-row-dash bills-dash">
              <strong className="dashboard-header">Bills</strong>
              <center className="dashboard-amount-due">{this.urgentBillsAmount()}</center>
            </div>
            <div className="card-action">
              <Link to="/bills" activeClassName="current">View All</Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="">
          <div className="bill-view-container">
            <div className="row center urgent-bills">
              {this.urgentBillsJsx()}
            </div>
          </div>
          <div className="card grey lighten-4">
            <div className="card-content bill-content">
              <center><b>This Month:</b></center>
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
                  {this.formatBillsJsx(this.state.thisMonthBills)}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col s12 m7">
            <div className="card grey lighten-4">
              <div className="card-content">
                <center><b>Lifetime</b></center>
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
                    {this.formatBillsJsx(this.state.allBills)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
      );
    }
  },
  render: function () {
    return (
      <div className="bills">
        {this.billView()}
      </div>
    );
  }
});

module.exports = Bill;
