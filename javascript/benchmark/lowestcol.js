var assert = require('assert');
var Benchmark = require('benchmark');

function Solver() {}

Solver.prototype.lowestCol1 = function () {
  var top, left, right, grouping, height;
  top = this.height;
  grouping = false;

  for (var i = 0; i < this.matrix.length; i++) {
    if (this.matrix[i] <= top) {
      right = i;

      if (!grouping || this.matrix[i] < top) {
        left = i;
        grouping = true;
        top = this.matrix[i];
      }
    } else {
      grouping = false;
    }
  }
  height = this.height - top;

  // Using an array might be a micro optimzation, for now this works great.
  return {
    top: top,
    left: left,
    // right: right,
    width: height ? (right - left + 1) : 0,
    height: height,
    currWidth: 0
  };
};

Solver.prototype.lowestCol2 = function () {
  var top, left, right, grouping, height;
  top = this.height;
  grouping = false;

  for (var i = 0; i < this.matrix.length; i++) {
    if (this.matrix[i] <= top) {
      right = i;

      if (!grouping || this.matrix[i] < top) {
        left = i;
        grouping = true;
        top = this.matrix[i];
      }
    } else {
      grouping = false;
    }
  }
  height = this.height - top;

  // Using an array might be a micro optimzation, for now this works great.
  return {
    top: top,
    left: left,
    // right: right,
    width: height ? (right - left + 1) : 0,
    height: height,
    currWidth: 0
  };
};

var suite = new Benchmark.Suite;
var solver = new Solver();
solver.matrix = [3,1,1,2,2,1,1,1];
solver.height = 8;
solver.width = 8;

suite
.add('lowestCol1', function () {
  solver.lowestCol1();
})
.add('lowestCol2', function () {
  solver.lowestCol2();
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
}).run({ 'async': true })
// console.log(solver.lowestCol());