 var width, height, blocks, matrix;

// Initialize matrix
function initialize() {
  for (var x = 0; x < width; x++) {
    matrix[x] = [];
    for (var y = 0; y < height; y++) {
      matrix[x][y] = null;
    }
  }
}

function place(tile, left, top) {
  if (!can_place(tile, left, top)) {
    return false;
  }
  tile.left = left;
  tile.top = top;
  for (var x = left; x < tile.width + left; x++) {
    for (var y = top; y < tile.height + top; y++) {
      matrix[x][y] = tile;
    }
  }

  return true;
}

function remove(tile) {
  for (var x = tile.left; x < tile.width + tile.left; x++) {
    for (var y = tile.top; y < tile.height + tile.top; y++) {
      matrix[x][y] = null;
    }
  }
}

function can_place(tile, left, top) {
  // Check all places of location if they can be placed.
  for (var x = left; x < tile.width + left; x++) {
    for (var y = top; y < tile.height + top; y++) {
      if (matrix[x] === undefined || matrix[x][y] === undefined || matrix[x][y]) {
        return false;
      }
    }
  }
  return true;
}

function startPlacing() {
  var tile;

  // If there are no tiles left in the stack.
  if (!(tile = blocks.shift())) {
    return true;
  }

  for (var x = 0; x <= width - tile.width; x++) {
    for (var y = 0; y <= height - tile.height; y++) {
      if (place(tile, x, y)) {
        if (startPlacing()) {
          return true;
        }
        remove(tile);
      }
    }
  }

  blocks.unshift(tile);
  return false;
}

function print_matrix() {
  for (var y = 0; y < height; y++) {
    var line = [];
    for (var x = 0; x < width; x++) {
      line.push(matrix[x][y] && matrix[x][y].width || 0);
    }
    console.log(line.join(' '));
  }
}

function Solve(config) {
  height = config.height;
  width = config.width;
  blocks = config.blocks;
  matrix = [];

  return {
    initialize: initialize,
    solve: function () {
      var now = Date.now();
      startPlacing();
      var end = (Date.now() - now) / 1000;
      console.log(blocks.length ? 'not' : '' + 'solved in', end, 's' );
    },
    print: print_matrix
  };
}

// var solver = Solve(require('./games/6x8.js'));
var solver = Solve(require('./games/17x17.js'));
// var solver = Solve(require('./games/23x27.js'));
// var solver = Solve(require('./games/55x56.js'));

solver.initialize();
solver.solve();
solver.print();