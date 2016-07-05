"use strict";
const React = require('react');
const Link = require('react-router').Link;

import {DatePicker} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

// const ThemeManager = require('material-ui/lib/styles/theme-manager')();


const Events = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function () {
    return { muiTheme: getMuiTheme(baseTheme) };
  },
  getInitialState: function () {
    return {
      dashboardView: true
    };
  },
  render: function () {
    return (
      <div className="col s12 m7">
        <div className="card grey lighten-4">
          <div className="card-content">
            <div>
              <span className="">Events Component</span>
              <hr />
              <MuiThemeProvider muiTheme={muiTheme}>
                <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" />
              </MuiThemeProvider>
            </div>
          </div>
          <div className="card-action">
            <a href="#">View more events</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Events;
