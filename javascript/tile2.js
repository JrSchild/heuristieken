var _ = require('lodash');
var width = 17;
var height = 17;
var matrix = [];
var placed = [];

// Ordered in size
var blocks = [
  { width: 7, height: 7, left: null, top: null},
  { width: 7, height: 7, left: null, top: null},
  { width: 7, height: 7, left: null, top: null},
  { width: 5, height: 5, left: null, top: null},
  { width: 5, height: 5, left: null, top: null},
  { width: 5, height: 5, left: null, top: null},
  { width: 3, height: 3, left: null, top: null},
  { width: 3, height: 3, left: null, top: null},
  { width: 3, height: 3, left: null, top: null},
  { width: 3, height: 3, left: null, top: null},
  { width: 3, height: 3, left: null, top: null},
  { width: 3, height: 3, left: null, top: null},
  { width: 3, height: 3, left: null, top: null},
  { width: 2, height: 2, left: null, top: null},
];

var solver = require('./solver')({
  width: width,
  height: height,
  blocks: blocks
});
solver.initialize();
solver.solve();
solver.print();

