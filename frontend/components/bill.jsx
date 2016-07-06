const React = require('react');
const BillActions = require('../actions/bill_actions.js');
// Date picker stuff
import {DatePicker} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const Bill = React.createClass({
  addBill: function () {
    const messagePrompt = `<h5>Create new bill</h5>`;
    vex.dialog.buttons.YES.text = "Create"
    vex.dialog.prompt({
      message: messagePrompt,
      input: "<input type='text' placeholder='Description' name='bill[description]' class='vex-input' id='bill-input-description'/>&nbsp;<input placeholder='Amt (53.11)' type='text' name='bill[amount]' id='bill-input-amount'/><br /><input placeholder='Due date (e.g. 03/08/2016)' type='text' name='bill[dueDate]' id='datepicker'/>",
      callback: function (response) {
        if (response) {
          const formData = {
            description: response["bill[description]"],
            amount: response["bill[amount]"],
            dueDate: response["bill[dueDate]"]
          }
          BillActions.createBill(formData);
        }
      }
    });
  },
  render: function () {
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
