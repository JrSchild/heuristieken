var _ = require('lodash');
var width = 23;
var height = 27;
var matrix = [];
var placed = [];

// Ordered in size
var blocks = [
  { width: 3, height: 6, left: null, top: null},
  { width: 4, height: 10, left: null, top: null},
  { width: 7, height: 6, left: null, top: null},
  { width: 9, height: 8, left: null, top: null},
  { width: 10, height: 10, left: null, top: null},
  { width: 9, height: 9, left: null, top: null},
  { width: 8, height: 8, left: null, top: null},
  { width: 8, height: 8, left: null, top: null},
  { width: 7, height: 7, left: null, top: null},
  { width: 6, height: 6, left: null, top: null},
  { width: 5, height: 5, left: null, top: null},
  { width: 4, height: 4, left: null, top: null},
  { width: 3, height: 3, left: null, top: null},
  { width: 2, height: 2, left: null, top: null},
  { width: 1, height: 1, left: null, top: null},
];

var solver = require('./solver')({
  width: width,
  height: height,
  blocks: blocks
});
solver.initialize();
solver.solve();
solver.print();