require('./testdom')('<html><body></body></html>');

global.reactModulesToStub = [
  'react-slider'
];

var assert = require('assert');

describe('table', function() {

  it('check if table rows,titles,and <table> exist', function(done) {
    var React = require('react/addons');
    var Table = require('../frontend/Table.jsx');
    var TestUtils = React.addons.TestUtils;

    var table = TestUtils.renderIntoDocument(
      <Table
        data={[{title1: 1,title2:2},
              {title1: 3,title2:4}]}
        titles={[{title:"title1",display:null},
                 {title: "title2", display:null}]}
        header="Header"
      />
    );
    var tableDom = TestUtils.scryRenderedDOMComponentsWithClass(table, "table-row");
    assert.equal(tableDom.length, 4);
    done();
  });

  it('check if column headers are rendering properly', function(done){
    var React = require('react/addons');
    var Table = require('../frontend/Table.jsx');
    var TestUtils = React.addons.TestUtils;

    var table = TestUtils.renderIntoDocument(
      <Table
        data={[{title1: 1,title2:2},
              {title1: 3,title2:4}]}
        titles={[{title:"title1",display:null},
                 {title: "title2", display:"cat"}]}
        header="Header"
      />
    );
    var noDisplay = TestUtils.scryRenderedDOMComponentsWithClass(table, "display-null");
    var display = TestUtils.scryRenderedDOMComponentsWithClass(table, "display");
    var displayHeader = TestUtils.findRenderedDOMComponentWithClass(table,"display");
    var titleHeader = TestUtils.findRenderedDOMComponentWithClass(table,"display-null");

    assert.equal(displayHeader.props.children, "cat");
    assert.equal(titleHeader.props.children, "title1");
    assert.equal(noDisplay.length, 1);
    assert.equal(display.length, 1);
    done();
  });

  it('col header onClick handlers working properly', function(done){
    var React = require('react/addons');
    var Table = require('../frontend/Table.jsx');
    var TestUtils = React.addons.TestUtils;

    var table = TestUtils.renderIntoDocument(
      <Table
        data={[{title1: 3,title2:2},
              {title1: 1,title2:4}]}
        titles={[{title:"title1",display:null},
                 {title: "title2", display:"cat"}]}
        header="Header"
      />
    );

    // Simulate a click and verify that it is now On
  //  var colHeader = React.findDOMNode(table,this.refs.cat);
  //  TestUtils.Simulate.change(colHeader);
  //  var rows = TestUtils.scryRenderedDOMComponentsWithClass(table, "data");
  //  console.log('rows');
  //  console.log(rows);
//    for (var i=1; i<rows.length; i++){
//      console.log('individ row');
//      console.log(rows[i]);
//    }
    //assert.equal(label.getDOMNode().textContent, 'On');
    done();
  });

});
