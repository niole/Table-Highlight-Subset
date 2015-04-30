"use strict";
/*global React*/

var React = require('react');
var Test = require('./Test.jsx');

var App = React.render( <Test/>, $('#container')[0]);

module.exports = App;
