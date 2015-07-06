"use strict";
/*global React*/

var React = require('react');

var Table = React.createClass({

  getDefaultProps: function() {
    return {
      functionality: "highlight",
      subset: [null,null],
      display: null
    };
  },

  propTypes: {
    display: React.PropTypes.string,
    data: React.PropTypes.array,
    titles: React.PropTypes.array,
    getRange: React.PropTypes.func,
    getColHeader: React.PropTypes.func,
    subset: React.PropTypes.array,
    functionality: React.PropTypes.string
  },

  getInitialState: function() {
    return ({
      displayTitle: this.props.displayTitle,
      data: this.props.data,
      colHeader: null
    });
  },

  getNewTitle: function(newSortTitle){

    var updateTitle = "";
    if (newSortTitle.display === null){
      updateTitle = newSortTitle.title;
    } else {
      updateTitle = newSortTitle.display;
    }
    var sortedData = this.state.data.sort(CompareSort);
    function CompareSort(a, b){
        if (a[newSortTitle.title] === b[newSortTitle.title]){
            return 0;
        }
        if (a[newSortTitle.title] < b[newSortTitle.title]){
            return -1;
        } else {
            return 1;
        }
    }

    this.props.getColHeader( newSortTitle.title );
    this.props.getRange( [sortedData[0][newSortTitle.title], sortedData[sortedData.length-1][newSortTitle.title]] );

    this.setState({
      displayTitle: updateTitle,
      colHeader: newSortTitle.title,
      data: sortedData
    });

  },

  render: function() {
    var TableBody = [];
    var domifiedRow = [];

    var TableHeaders = this.props.titles.map(function(title){
      if (title.display === null ){
        return ( <td onClick={this.getNewTitle.bind(null,title)} key={title.title}>{title.title}</td> );
      } else {
        return ( <td onClick={this.getNewTitle.bind(null,title)} key={title.title}>{title.display}</td> );
      }
    }.bind(this));

    if (this.props.functionality === "highlight"){

      this.state.data.forEach(function(row,i){

        if (this.state.colHeader !== null){
            for (var attr in row){
              domifiedRow.push( <td>{row[attr]}</td> );
            }
            if (row[this.state.colHeader] >= this.props.subset[0] &&
                 row[this.state.colHeader] <= this.props.subset[1]) {
                TableBody.push( <tr id="highlight" className="text table-row">{domifiedRow}</tr> );
            } else {
                TableBody.push( <tr className="text table-row">{domifiedRow}</tr> );
             }
          domifiedRow = [];
        } else {

          for (var attr in row){
            domifiedRow.push( <td>{row[attr]}</td> );
          }
          TableBody.push( <tr className="text table-row">{domifiedRow}</tr> );
          domifiedRow = [];
        }
      }.bind(this));
    }

    if (this.props.functionality === "subset"){
      this.state.data.forEach(function(row,i){
        if (this.state.colHeader !== null){
          if (row[this.state.colHeader] >= this.props.subset[0] &&
              row[this.state.colHeader] <= this.props.subset[1]) {
            for (var attr in row){
              domifiedRow.push( <td>{row[attr]}</td> );
            }
            if (i%2 === 0) {
              TableBody.push( <tr id="odd" className="text table-row">{domifiedRow}</tr> );
            }
            if (i%2 === 1){
              TableBody.push( <tr id="even" className="text table-row">{domifiedRow}</tr> );
            }
              domifiedRow = [];
          }
        } else {
            for (var attr in row){
              domifiedRow.push( <td>{row[attr]}</td> );
          }
          if (i%2 === 0) {
            TableBody.push( <tr id="odd" className="text table-row">{domifiedRow}</tr> );
          }
          if (i%2 === 1){
            TableBody.push( <tr id="even" className="text table-row">{domifiedRow}</tr> );
          }
            domifiedRow = [];
        }
      }.bind(this));
    }
    var display = "none";
    if (this.props.display !== null){
      display = "block";
    }

    return(
      <div>
        <p style={{display: display}} className="filter-on text">filter on column: {this.state.displayTitle}</p>

        <div className="display-box container-fluid">
          <table className="table-row">
            <th>
              <tr id="col-titles" className="text table-row">{TableHeaders}</tr>
            </th>
            <tbody>
              {TableBody}
            </tbody>
          </table>
        </div>

      </div>
    );
  }
});

module.exports = Table;
