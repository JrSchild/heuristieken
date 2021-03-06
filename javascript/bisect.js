var Solver = require('./bisect.solver.js');

// Run unit tests
require('./bisect.test')(Solver);

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
// new Solver(require('./games/23x27'), options).start();
new Solver(require('./games/55x56'), options).start();
// new Solver(require('./games/112x112'), options).start();
// new Solver(require('./games/175x175'), options).start();