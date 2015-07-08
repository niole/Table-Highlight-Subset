"use strict";
/*global React*/

var React = require('react');
var Table = React.createClass({

  getDefaultProps: function() {
    return {
      functionality: "highlight",
      subset: [null,null]
    };
  },

  propTypes: {
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
        return ( React.createElement("td",{
                                      onClick: this.getNewTitle.bind(null,title),
                                      key: title.title
                                      },
                                      title.title
                                    ));

      } else {
        return ( React.createElement("td",{
                                      onClick: this.getNewTitle.bind(null,title),
                                      key: title.title
                                      },
                                      title.display
                                    ));
      }
    }.bind(this));

    if (this.props.functionality === "highlight"){

      this.state.data.forEach(function(row){

        if (this.state.colHeader !== null){
            for (var attr in row){
              domifiedRow.push( React.createElement("td",{},row[attr]) );
            }
            if (row[this.state.colHeader] >= this.props.subset[0] &&
                 row[this.state.colHeader] <= this.props.subset[1]) {
                TableBody.push( React.createElement("tr",{
                                                      id: "highlight",
                                                      className: "text table-row"
                                                      },
                                                      domifiedRow
                                                   )
                              );


            } else {
                TableBody.push( React.createElement("tr",{
                                                      className: "text table-row"
                                                      },
                                                      domifiedRow
                                                   )
                              );
             }
           domifiedRow = [];
        } else {

          for (var attr in row){
            domifiedRow.push( React.createElement("td",{},row[attr]) );
          }
          TableBody.push( React.createElement("tr",{
                                                className: "text table-row"
                                                },
                                                domifiedRow
                                             )
                        );

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
              domifiedRow.push( React.createElement("td",{},row[attr]) );
            }
            if (i%2 === 0) {
              TableBody.push( React.createElement("tr",{
                                                    id: "odd",
                                                    className: "text table-row"
                                                    },
                                                    domifiedRow
                                                 )
                            );
            }
            if (i%2 === 1){
              TableBody.push( React.createElement("tr",{
                                                    id: "even",
                                                    className: "text table-row"
                                                    },
                                                    domifiedRow
                                                 )
                            );
            }
            domifiedRow = [];
          }


        } else {
            for (var attr in row){
              domifiedRow.push( React.createElement("td",{},row[attr]) );
              //domifiedRow.push( <td>{row[attr]}</td> );
          }
          if (i%2 === 0) {
            TableBody.push( React.createElement("tr",{
                                                  id: "odd",
                                                  className: "text table-row"
                                                  },
                                                  domifiedRow
                                               ));

          }
          if (i%2 === 1){
            TableBody.push( React.createElement("tr",{
                                                  id: "even",
                                                  className: "text table-row"
                                                  },
                                                  domifiedRow
                                               ));

          }
            domifiedRow = [];
        }
      }.bind(this));
    }

    return(
      React.createElement("div",{},
       React.createElement("div",{
                            className: "display-box container-fluid"
                            },
         React.createElement("table",{
                              className: "table-row"
                               },
          React.createElement("th",{},
            React.createElement("tr",{
              id: "col-titles",
              className: "text table-row"
              },
              TableHeaders
          ),
          React.createElement("tbody",{},
                              TableBody
          )
        )
       )
      )
    )
   );
  }
});

module.exports = Table;
