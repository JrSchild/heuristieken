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

// Initialize matrix
for (var x = 0; x < width; x++) {
  matrix[x] = [];
  for (var y = 0; y < height; y++) {
    matrix[x][y] = null;
  }
}

function place(tile, left, top) {
  if (!canPlace(tile, left, top)) {
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
  tile.left = null;
  tile.right = null;
}

function canPlace(tile, left, top) {
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
// console.log(matrix);
// console.log(place(blocks[0], 0, 0));
// console.log(place(blocks[1], 0, 4));
// console.log(place(blocks[0], 1, 4));
// console.log(place(blocks[0], 2, 5));

// On every iteration, shift the first tile. Push it on stack of placed tiles. Try placing it everywhere, continue

var start_try_place_l = 0;
var start_try_place_t = 0;
console.log('solved', startPlacing());
function startPlacing() {
  var tile, x, y;

  if (!(tile = blocks.shift())) {
    console.log('stop');
    return true;
  }
  // console.log(tile.width);
  for (x = 0; x <= width - tile.width; x++) {
    for (y = 0; y <= height - tile.height; y++) {
      if (place(tile, x, y)) {
        // print_matrix();
        if (startPlacing()) {
          return true;
        }
        remove(tile);
      }
    }
  }

  blocks.unshift(tile);
  return false;

  // return startPlacing();
}

print_matrix();
function print_matrix() {
  for (var y = 0; y < height; y++) {
    var line = [];
    for (var x = 0; x < width; x++) {
      line.push(matrix[x][y] && matrix[x][y].width || 0);
    }
    console.log(line.join(' '));
  }
}


