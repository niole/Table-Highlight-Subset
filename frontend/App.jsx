"use strict";
/*global React*/

var React = require('react');
var DashBoard = require('./DashBoard.jsx');
var Data = require('./Data.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <DashBoard
          data={Data.data}
          titles={Data.titles}
          header={Data.header}
        />
      </div>
    );
  }
});


React.render( <App/>, $('#container')[0]);
