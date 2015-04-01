var _ = require('lodash');
var width = 55;
var height = 56;
var matrix = [];
var placed = [];

// Ordered in size
var blocks = [
  { width: 20, height: 21, left: null, top: null },
  { width: 19, height: 20, left: null, top: null },
  { width: 19, height: 18, left: null, top: null },
  { width: 18, height: 17, left: null, top: null },
  { width: 16, height: 17, left: null, top: null },
  { width: 16, height: 15, left: null, top: null },
  { width: 14, height: 15, left: null, top: null },
  { width: 14, height: 13, left: null, top: null },
  { width: 12, height: 13, left: null, top: null },
  { width: 12, height: 11, left: null, top: null },
  { width: 10, height: 11, left: null, top: null },
  { width: 9, height: 10, left: null, top: null },
  { width: 9, height: 8, left: null, top: null },
  { width: 7, height: 8, left: null, top: null },
  { width: 7, height: 6, left: null, top: null },
  { width: 6, height: 5, left: null, top: null },
  { width: 5, height: 4, left: null, top: null },
  { width: 4, height: 3, left: null, top: null },
  { width: 2, height: 3, left: null, top: null },
  { width: 1, height: 2, left: null, top: null }
];

var solver = require('./solver')({
  width: width,
  height: height,
  blocks: blocks
});
solver.initialize();
solver.solve();
solver.print();