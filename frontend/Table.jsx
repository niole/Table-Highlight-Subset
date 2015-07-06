"use strict";
/*global React*/

var React = require('react');
var Slider = require('react-slider');

var Table = React.createClass({
  propTypes: {
    header: React.PropTypes.string,
    data: React.PropTypes.array,
    titles: React.PropTypes.array,
    functionality: React.PropTypes.string,
    Ubound: React.PropTypes.number,
    Lbound: React.PropTypes.number,
    getNewTitle: React.PropTypes.func
  },
  render: function() {
    var sortOnTitle = this.props.sortOnTitle;
    var TableBody = [];
    var domifiedRow = [];

    var TableHeaders = this.props.titles.map(function(title){
      if (title.display === null ){
        return ( <td onClick={this.props.getNewTitle.bind(null,title)} key={title.title}>{title.title}</td> );
      } else {
        return ( <td onClick={this.props.getNewTitle.bind(null,title)} key={title.title}>{title.display}</td> );
      }
    }.bind(this));

    if (this.props.functionality === "highlight"){
      this.props.data.forEach(function(row){
        if (this.props.Ubound !== null || this.props.Lbound !== null){
            for (var attr in row) {domifiedRow.push( <td>{row[attr]}</td> );}
            if (row[sortOnTitle] >= this.props.Lbound && row[sortOnTitle] <= this.props.Ubound) {
                TableBody.push( <tr id="highlight" className="text table-row">{domifiedRow}</tr> );
            } else {
                TableBody.push( <tr id="odd" className="text table-row">{domifiedRow}</tr> );
             }
            domifiedRow = [];
        } else {
          for (var attr in row) {domifiedRow.push( <td>{row[attr]}</td> );}
          TableBody.push( <tr className="text table-row">{domifiedRow}</tr> );
          domifiedRow = [];
        }
      }.bind(this));
    }

    if (this.props.functionality === "subset"){
      this.props.data.forEach(function(row,i){
        if (this.props.Ubound !== null || this.props.Lbound !== null){
          if (row[sortOnTitle] >= this.props.Lbound && row[sortOnTitle] <= this.props.Ubound) {
            for (var attr in row){domifiedRow.push( <td>{row[attr]}</td> );}
            if (i%2 === 0) {TableBody.push( <tr id="odd" className="text table-row">{domifiedRow}</tr> );}
            if (i%2 === 1){TableBody.push( <tr id="even" className="text table-row">{domifiedRow}</tr> );}
            domifiedRow = [];
          }
        } else {
            for (var attr in row){domifiedRow.push( <td>{row[attr]}</td> );}
          if (i%2 === 0) {TableBody.push( <tr id="odd" className="text table-row">{domifiedRow}</tr> );}
          if (i%2 === 1){TableBody.push( <tr id="even" className="text table-row">{domifiedRow}</tr> );}
          domifiedRow = [];
        }
      }.bind(this));
    }

    return(
      <div>
        <h1 className="table-header text">{this.props.header}</h1>
        <p className="filter-on text">filter on column: {this.props.displayTitle}</p>
        <table className="table-row">
          <th>
            <tr id="col-titles" className="text table-row">{TableHeaders}</tr>
          </th>
          <tbody>
            {TableBody}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Table;
