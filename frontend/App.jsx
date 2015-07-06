"use strict";
/*global React*/

var React = require('react');
var Table = require('./Table.jsx');
var Data = require('./Data.jsx');

var App = React.createClass({

  getInitialState: function(){
    return ({
      range: [null,null],
      colHeader: null
    });
  },

  render: function() {
    return (
      <div>
        <h1 className="text">{this.state.colHeader}</h1>
        <Table
          subset={[2,15]}
          functionality={"subset"}
          getColHeader={this.printHeader}
          getRange={this.showRange}
          data={Data.data}
          titles={Data.titles}
          display={""}
        />
      </div>
    );
  },
  printHeader: function(header){
    this.setState({ colHeader: header });
  },
  showRange: function(range){
    this.setState({ range: range });
  }
});


React.render( <App/>, $('#container')[0]);
