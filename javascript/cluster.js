'use strict';

var cluster = require('cluster');
var _ = require('lodash');
var Solver = require('./bisect.solver');
var SolverCluster = require('./cluster.solver');

// Code to run if we're in the master process
if (cluster.isMaster) {
  // console.log('master');

  var options = {
    log: false,
    write: true,
    all: true,
    shuffle: false,
    sortBySize: false
  };

  var solver = new Solver(require('./games/55x56'), options);
  var workers = new SolverCluster(solver);

  var start = Date.now();
  workers.run(function (solver) {
    var end = Date.now();
    console.log((end - start) / 1000, 's');
    console.log('found', solver.solutions.length, 'solutions');
    // console.log('finished', solver.solutions.length);
  });

// Code to run if we're in a worker process
} else {
  // console.log('worker');

  process.on('message', function(_solver) {
    var solver = new Solver(_solver.game, _solver.options);
    _.assign(solver, _solver);
    solver.solve();

    process.send(solver.solutions)
  });
}
