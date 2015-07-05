'use strict';
var d3 = require('d3');
var Slider = {};

Slider.create = function(el, props, state) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  svg.append('g')
      .attr('class', 'd3points');
/*      .attr("stroke-width", 2)
      .attr("stroke", "black");*/
  this.update(el, state);
};

Slider.update = function(el, state) {
  // Re-compute the scales, and render the data points

  var scales = this._scales(el, state.domain);
  this._drawPoints(el, scales, state.data);
};

Slider._scales = function(el,domain){
  if (!domain){
    return null;
  }
  var width = el.offsetWidth;
  var x = d3.scale.linear()
          .range([0,width])
          .domain(domain);
  return {x: x};
};

Slider._drawPoints = function(el, scales, data) {
  var circle = d3.select(el).selectAll('.d3points');

  var point = circle.selectAll('.d3point')
    .data(data, function(d) { return d.id; });

  // ENTER & UPDATE
  point.enter().append('circle')
      .attr('class', 'd3-point')
      .attr('cx', function(d) {
        return scales.x(d.x);
      })
      .attr('cy', function(d) { return 5; })
      .attr('r', function(d) { return 5; });


  // ENTER
/*  point.enter().append('line')
      .attr('class', 'd3line');
      .attr("x1", 5)
      .attr("y1", 5)
      .attr("x2", 50)
      .attr("y2", 50);*/

  // EXIT
  point.exit()
      .remove();
};


/*Slider.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};
*/
module.exports = Slider;
