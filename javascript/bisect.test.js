var _ = require('lodash');
var assert = require('assert');

module.exports = function (Solver) {
  var solver, game, beforePop, sameRow;

  game = {
    width: 6,
    height: 8,
    blocks: [
      { width: 7, height: 3 },
      { width: 7, height: 1 },
      { width: 7, height: 3 },
    ]
  };

  solver = new Solver(game);

  assert.deepEqual(solver.lowestCol(), {
    lowest_col: 0,
    pos_left: 0,
    // pos_right: 5,
    width: 6,
    height: 8,
    currWidth: 0
  });

  solver.place({width: 3, height: 4}, solver.lowestCol());
  sameRow = solver.lowestCol();
  solver.place({width: 1, height: 5}, sameRow);
  beforePop = _.cloneDeep(sameRow);
  solver.place({width: 1, height: 5}, sameRow);
  assert.deepEqual(solver.matrix, [4, 4, 4, 5, 5, 0]);
  solver.pop(sameRow);
  assert.deepEqual(beforePop, sameRow);
  assert.deepEqual(solver.matrix, [4, 4, 4, 5, 0, 0]);
  solver.place({width: 2, height: 3}, solver.lowestCol());
  solver.place({width: 2, height: 5}, solver.lowestCol());
  solver.place({width: 3, height: 4}, solver.lowestCol());
  solver.place({width: 1, height: 3}, solver.lowestCol());
  assert.deepEqual(solver.matrix, [8, 8, 8, 8, 8, 8]);
};