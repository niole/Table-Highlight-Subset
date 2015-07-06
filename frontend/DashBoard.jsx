"use strict";
/*global React*/

var React = require('react');
var Slider = require('react-slider');
var Table = require('./Table.jsx');

var DashBoard = React.createClass({
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
      data: this.props.data,
      tableToggle: -1
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
  tableView: function(e){
    e.preventDefault();
    this.setState({tableToggle: this.state.tableToggle*-1});
  },
  render: function() {

    var table = [];
    if (this.state.tableToggle === 1){
      table.push(
        <Table
          header={this.props.header}
          data={this.state.data}
          titles={this.props.titles}
          functionality={this.state.functionality}
          sortOnTitle={this.state.sortOnTitle}
          displayTitle={this.state.displayTitle}
          Ubound={this.state.Ubound}
          Lbound={this.state.Lbound}
          getNewTitle={this.getNewTitle}
        />
      );
    }
    var children = [ React.createElement("div",{className: "text handle-label"},this.state.Lbound),
                     React.createElement("div",{className: "text handle-label"},this.state.Ubound)];
    return(
      <div>
        <div className="buttons">
          <div onClick={this.useHighlight} className="text button">highlight</div>
          <div onClick={this.useSubSet} className="text button">subset</div>
          <div onClick={this.tableView} className="text button">toggle table</div>
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
          <div>
            {table}
          </div>

        </div>
      </div>
    );
  }
});

module.exports = DashBoard;
