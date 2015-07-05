"use strict";
/*global React*/

var React = require('react');
var Slider = require('react-slider');

var Table = React.createClass({
  propTypes: {
    header: React.PropTypes.string,
    data: React.PropTypes.array,
    titles: React.PropTypes.array
  },
  getInitialState: function() {
    return ({
      functionality: "highlight",
      sortOnTitle: null,
      displayTitle: null,
      range: [null, null],
      Ubound: null,
      Lbound: null,
      data: this.props.data
    });
  },
  updateBounds: function(bounds){
    this.setState({
      Lbound: bounds[0],
      Ubound: bounds[1]
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
    this.setState({
      sortOnTitle: newSortTitle.title,
      displayTitle: updateTitle,
      Ubound: sortedData[sortedData.length-1][newSortTitle.title],
      Lbound: sortedData[0][newSortTitle.title],
      range: [sortedData[0][newSortTitle.title],sortedData[sortedData.length-1][newSortTitle.title]],
      data: sortedData
    });
  },
  useSubSet: function(e){
    e.preventDefault();
    this.setState({functionality: "subset"});

  },
  useHighlight: function(e){
    e.preventDefault();
    this.setState({functionality: "highlight"});
  },
  render: function() {
    var sortOnTitle = this.state.sortOnTitle;
    var TableBody = [];
    var domifiedRow = [];

    var TableHeaders = this.props.titles.map(function(title){
      if (title.display === null ){
        return ( <td onClick={this.getNewTitle.bind(null,title)} key={title.title}>{title.title}</td> );
      } else {
        return ( <td onClick={this.getNewTitle.bind(null,title)} key={title.title}>{title.display}</td> );
      }
    }.bind(this));

    if (this.state.functionality === "highlight"){
      this.state.data.forEach(function(row,i){
        if (this.state.Ubound !== null || this.state.Lbound !== null){
            for (var attr in row){
              domifiedRow.push( <td>{row[attr]}</td> );
            }
            if (row[sortOnTitle] >= this.state.Lbound && row[sortOnTitle] <= this.state.Ubound) {
                TableBody.push( <tr id="highlight" className="text table-row">{domifiedRow}</tr> );
            } else {
                TableBody.push( <tr id="odd" className="text table-row">{domifiedRow}</tr> );
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

    if (this.state.functionality === "subset"){
      this.state.data.forEach(function(row,i){
        if (this.state.Ubound !== null || this.state.Lbound !== null){
          if (row[sortOnTitle] >= this.state.Lbound && row[sortOnTitle] <= this.state.Ubound) {
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

    var children = [ React.createElement("div",{className: "text handle-label"},this.state.Lbound),
                     React.createElement("div",{className: "text handle-label"},this.state.Ubound)
                    ];

    return(
      <div>
        <h1 className="table-header text">{this.props.header}</h1>
        <p className="filter-on text">filter on column: {this.state.displayTitle}</p>

        <div className="buttons">
          <div onClick={this.useHighlight} className="text button">highlight</div>
          <div onClick={this.useSubSet} className="text button">subset</div>
        </div>

        <div className="display-box container-fluid">
          <Slider
            children={children}
            onAfterChange={this.updateBounds}
            value={[this.state.Lbound,this.state.Ubound]}
            min={this.state.range[0]}
            max={this.state.range[1]}
            withBars
          />
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
