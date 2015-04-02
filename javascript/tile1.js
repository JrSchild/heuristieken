var _ = require('lodash');
var width = 6;
var height = 8;
var matrix = [];
var placed = [];

// Ordered in size
var blocks = [
  { width: 4, height: 4, left: null, top: null },
  { width: 4, height: 4, left: null, top: null },
  { width: 2, height: 2, left: null, top: null },
  { width: 2, height: 2, left: null, top: null },
  { width: 2, height: 2, left: null, top: null },
  { width: 2, height: 2, left: null, top: null }
];

var solver = require('./solver')({
  width: width,
  height: height,
  blocks: blocks
});
solver.initialize();
solver.solve();
solver.print();