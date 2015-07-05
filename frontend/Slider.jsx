"use strict";

var React = require('react');
//var slider = require('./d3components/Slider.js');

var Slider = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
  },

  componentDidMount: function() {
    var el = $('#LB')[0];
    slider.create(el, {
      width: '100%',
      height: '15%'
    }, this.getSliderState());
  },

  componentDidUpdate: function() {
    var el = $('#LB')[0];
    slider.update(el, this.getSliderState());
  },

  getSliderState: function() {
    return {
      LB: this.props.Lbound,
      UB: this.props.Ubound,
      domain: [0,this.props.data.length],
      data: this.props.data
    };
  },

  componentWillUnmount: function() {
    var el = $('#LB');
    slider.destroy(el);
  },

  render: function() {
    return(
      <div>
        <h2>component mounted</h2>
        <div>
          <div id="LB"></div>
          <div id="UB"></div>
        </div>
      </div>
    );
  }
});

module.exports = Slider;
