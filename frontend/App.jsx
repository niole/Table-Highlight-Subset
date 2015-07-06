"use strict";
/*global React*/

var React = require('react');
var Table = require('./Table.jsx');
var Data = require('./Data.jsx');

/*
 * subset - subset of data you want to highlight
 * functionality - "highlight" or "subset"
 * getColHeader - callback returns a column header string once clicked on
 * getRange - callback returns min and max of all data in clicked on column
 * data - data to visualize {attr1: int, attr2: int...}
 * titles - column headers {title: "title_which_matches_attr_keys_in_data,
 *                          display: "title you want to show on table, defaults
 *                                    to null and shows titles.title"}
 * display - "none" or "block" to show header which displays column being filtered
 * */

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
