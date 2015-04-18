'use strict';

var cluster = require('cluster');
var _ = require('lodash');
var async = require('async');

function SolverCluster(solver) {
  this.solver = solver;
  this.workers = [];
  this.startForks();
  this.CPUs = require('os').cpus().length;
}
SolverCluster.prototype.push = function (worker) {
  this.workers.push({
    busy: false,
    cb: null,
    worker: worker,
  });
};
SolverCluster.prototype.freeWorkers = function () {
  return _.filter(this.workers, function (worker) {
    return !worker.busy
  }).length;
};
SolverCluster.prototype.freeWorker = function () {
  return _.find(this.workers, function (worker) {
    return !worker.busy;
  });
};
SolverCluster.prototype.work = function (solver, row, cb) {
  var worker;

  if (!(worker = this.freeWorker())) {
    throw 'No workers';
    return cb && cb('No Workers');
  }
  worker.busy = true;
  worker.cb = cb;

  worker.worker.send(solver);
};

// Create a worker for each CPU
SolverCluster.prototype.startForks = function (cb) {
  for (let i = this.CPUs; i--;) {
    let _worker = {
      busy: false,
      worker: cluster.fork()
    }
    this.workers.push(_worker);
    _worker.worker.on('message', function (solutions) {
      _worker.busy = false;
      _worker.cb && _worker.cb(null, solutions);
    }.bind(this));
  }
};


// Try to do one round, store the state and finish them individually.
SolverCluster.prototype.run = function (cb) {
  var tile, currTile, length, i, row, _solver, i;
  
  if (!(length = this.solver.blocks.length)) { return this.solver.solved(); }
  if (!row) { row = this.solver.lowestCol(); }

  _.each(this.solver.blocks, function (block, i) {
    block.i = i;
  });
  
  this.solver.solutions = [];

  i = 0;
  async.eachLimit(this.solver.blocks, 4, function (block, next) {
    var wait;

    currTile = this.solver.blocks.splice(i, 1)[0];

    if (this.solver.place(currTile, row)) {
      wait = true;
      let _solver = this.solver.clone();
      let _row = _.cloneDeep(row);
      _solver.solutions = [];
      _solver.placed = [];

      this.work(_solver, _row, function (err, solutions) {
        if (err) { throw err; }

        console.log('found', solutions.length);
        this.solver.solutions.push.apply(this.solver.solutions, solutions);
        next();
      }.bind(this));
      // _.delay(function () {
      //   _solver.solve(_row.currWidth !== _row.width ? _row : null);
      //   this.solver.solutions.push.apply(this.solver.solutions, _solver.solutions);
      //   // Only run next if current work is finished and cluster is no longer working.
      //   next();
      // }.bind(this));
    }

    this.solver.pop(row);
    this.solver.blocks.splice(i, 0, currTile);

    i++;
    return !wait && next && next();
  }.bind(this), function () {
    return cb && cb(this.solver);
    console.log('this.solver.solutions', this.solver.solutions.length);
  }.bind(this));
  // for (i = 0; i < length; i++) {
  //   currTile = this.solver.blocks.splice(i, 1)[0];

  //   if (this.solver.place(currTile, row)) {
  //     _solver = solver.clone();
  //     _solver.solutions = [];
  //     _solver.placed = [];
  //     _solver.solve(row.currWidth !== row.width ? row : null);

  //     this.solver.solutions.push.apply(this.solver.solutions, _solver.solutions);
  //     // console.log('_solver.solutions', _solver.solutions.length, 'this.solver.solutions', this.solver.solutions.length);
  //     // console.log('this.solver.solutions', this.solver.solutions.length);
  //     // this.solver.solutions.push.apply(this.solver.solutions, _solver.solutions);
  //   }

  //   this.solver.pop(row);
  //   this.solver.blocks.splice(i, 0, currTile);
  // }
};


module.exports = SolverCluster;