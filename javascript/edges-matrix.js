var Solver = require('./edges-matrix.solver.js');

var options = {
  log: true,
  write: true,
  canTurn: false,
  all: false,
  shuffle: false,
  sortBySize: false
};

// new Solver(require('./games/6x8'), options).start();
// new Solver(require('./games/17x17'), options).start();
new Solver(require('./games/23x27'), options).start();
// new Solver(require('./games/55x56'), options).start();
// new Solver(require('./games/112x112'), options).start();
// new Solver(require('./games/175x175'), options).start();

// var solver = new Solver(require('./games/17x17'), options);
// solver.placeRight(solver.findFreeRight(), solver.blocks[0]);
// solver.placeRight(solver.findFreeRight(), solver.blocks[1]);
// solver.placeRight(solver.findFreeRight(), solver.blocks[2]);
// solver.placeRight(solver.findFreeRight(), solver.blocks[6]);
// solver.pop();
// solver.pop();
// solver.pop();
// solver.print();

// solver.placeBottom(solver.findFreeBottom(), solver.blocks[0]);
// solver.placeBottom(solver.findFreeBottom(), solver.blocks[1]);
// solver.placeBottom(solver.findFreeBottom(), solver.blocks[2]);
// solver.placeBottom(solver.findFreeBottom(), solver.blocks[6]);
// solver.print();

// solver.placeLeft(solver.findFreeLeft(), solver.blocks[0]);
// solver.placeLeft(solver.findFreeLeft(), solver.blocks[1]);
// solver.placeLeft(solver.findFreeLeft(), solver.blocks[2]);
// solver.placeLeft(solver.findFreeLeft(), solver.blocks[6]);
// solver.print();