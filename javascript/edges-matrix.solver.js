var _ = require('lodash');
var assert = require('assert');
var fs = require('fs');

function Solver(game, options) {
  this.game = game; // Needed for copying.
  this.width = game.width;
  this.height = game.height;
  this.blocks = _.cloneDeep(game.blocks);
  this.scale = game.scale;
  this.options = options || {};
  this.matrix = [];
  for (var y = 0; y < game.height; y++) {
    this.matrix[y] = [];
    for (var x = 0; x < game.width; x++) {
      this.matrix[y][x] = null;
    }
  }
  this.placed = [];
  this.solutions = [];
}

Solver.prototype.solved = function () {
  this.solutions.push(_.pluck(this.placed, 'i').reverse().join(' '));

  // Automatically log solutions when not specifically set to false.
  if (this.options.log !== false) {
    console.log('solution #' + this.solutions.length, ' ', this.solutions[this.solutions.length - 1]);
  }
  if (this.options.write) {
    this.write();
  }
  if (this.options.all) {
    return false;
  }

  return true;
}

// Should a new row be created? Or are we using the previous one, this way we can bubble up and down.
Solver.prototype.solve = function () {
  return this.solveTop();
};

Solver.prototype.solveTop = function () {
  var freePlace, currTile, length, i;

  if (!(length = this.blocks.length)) {
    return this.solved();
  }
  if (!(freePlace = this.findFreeTop())) {
    return this.solveRight();
  }

  for (i = 0; i < length; i++) {
    currTile = this.blocks.splice(i, 1)[0];

    if (this.place(freePlace, currTile)) {
      if (this.solveTop()) {
        return true;
      }
      this.pop(freePlace);
    }

    this.blocks.splice(i, 0, currTile);
  }

  return false;
};

Solver.prototype.solveRight = function () {
  var freePlace, currTile, length, i;

  if (!(length = this.blocks.length)) {
    return this.solved();
  }
  if (!(freePlace = this.findFreeRight())) {
    return this.solveBottom();
  }

  for (i = 0; i < length; i++) {
    currTile = this.blocks.splice(i, 1)[0];

    if (this.placeRight(freePlace, currTile)) {
      if (this.solveRight()) {
        return true;
      }
      this.pop(freePlace);
    }

    this.blocks.splice(i, 0, currTile);
  }

  return false;
};

Solver.prototype.solveBottom = function () {
  var freePlace, currTile, length, i;

  if (!(length = this.blocks.length)) {
    return this.solved();
  }
  if (!(freePlace = this.findFreeBottom())) {
    return this.solveLeft();
  }

  for (i = 0; i < length; i++) {
    currTile = this.blocks.splice(i, 1)[0];

    if (this.placeBottom(freePlace, currTile)) {
      if (this.solveBottom()) {
        return true;
      }
      this.pop(freePlace);
    }

    this.blocks.splice(i, 0, currTile);
  }

  return false;
};

Solver.prototype.solveLeft = function () {
  var freePlace, currTile, length, i;

  if (!(length = this.blocks.length)) {
    return this.solved();
  }
  if (!(freePlace = this.findFreeLeft())) {
    return this.solveRest();
  }

  for (i = 0; i < length; i++) {
    currTile = this.blocks.splice(i, 1)[0];

    if (this.placeLeft(freePlace, currTile)) {
      if (this.solveLeft()) {
        return true;
      }
      this.pop(freePlace);
    }

    this.blocks.splice(i, 0, currTile);
  }

  return false;
};
Solver.prototype.solveRest = function () {
  var freePlace, currTile, length, i;

  if (!(length = this.blocks.length)) {
    return this.solved();
  }
  if (!(freePlace = this.findFree())) {
    return this.solved();
  }

  for (i = 0; i < length; i++) {
    currTile = this.blocks.splice(i, 1)[0];

    if (this.place(freePlace, currTile)) {
      if (this.solveRest()) {
        return true;
      }
      this.pop(freePlace);
    }

    this.blocks.splice(i, 0, currTile);
  }

  return false;
};

Solver.prototype.findFreeTop = function () {
  for (var x = 0; x < this.width; x++) {
    if (this.matrix[0][x] === null) {
      return [0, x];
    }
  }

  return false;
};
Solver.prototype.findFreeRight = function () {
  for (var y = 0, x = this.width - 1; y < this.height; y++) {
    if (this.matrix[y][x] === null) {
      return [y, x];
    }
  }

  return false;
};
Solver.prototype.findFreeBottom = function () {
  for (var x = this.width - 1, y = this.height - 1; x >= 0; x--) {
    if (this.matrix[y][x] === null) {
      return [y, x];
    }
  }

  return false;
};
Solver.prototype.findFreeLeft = function () {
  for (var x = 0, y = this.height - 1; y >= 0; y--) {
    if (this.matrix[y][x] === null) {
      return [y, x];
    }
  }

  return false;
};
Solver.prototype.findFree = function () {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      if (this.matrix[y][x] === null) {
        return [y, x];
      }
    }
  }

  return false;
};

Solver.prototype.place = function (place, tile) {
  if (!this.canPlace(place, tile)) {
    return false;
  }

  tile.top = place[0];
  tile.left = place[1];
  for (var y = place[0], ly = place[0] + tile.height; y < ly; y++) {
    for (var x = place[1], lx = place[1] + tile.width; x < lx; x++) {
      this.matrix[y][x] = tile;
    }
  }
  this.placed.unshift(tile);
  return true;
};
Solver.prototype.placeRight = function (place, tile) {
  return this.place([place[0], place[1] - tile.width + 1], tile);
};
Solver.prototype.placeBottom = function (place, tile) {
  return this.place([place[0] - tile.height + 1, place[1] - tile.width + 1], tile);
}
Solver.prototype.placeLeft = function (place, tile) {
  return this.place([place[0] - tile.height + 1, place[1]], tile);
}

Solver.prototype.canPlace = function (place, tile) {
  for (var y = place[0], ly = place[0] + tile.height; y < ly; y++) {
    for (var x = place[1], lx = place[1] + tile.width; x < lx; x++) {
      if (this.matrix[y] === undefined || this.matrix[y][x] === undefined || this.matrix[y][x]) {
        return false;
      }
    }
  }
  return true;
};
Solver.prototype.pop = function (place) {
  var tile;

  if (!(tile = this.placed.shift())) {
    return null;
  }

  for (var y = tile.top; y < tile.top + tile.height; y++) {
    for (var x = tile.left; x < tile.left + tile.width; x++) {
      this.matrix[y][x] = null;
    }
  }
  tile.left = null;
  tile.top = null;
};
Solver.prototype.print = function() {
  for (var x = 0; x < this.width; x++) {
    var line = [];
    for (var y = 0; y < this.height; y++) {
      line.push(this.matrix[x][y] && this.matrix[x][y].width || 0);
    }
    console.log(line.join(' '));
  }
};


Solver.prototype.write = function () {
  fs.writeFileSync('./solutions/' + this.width + 'x' + this.height + '_' + this.solutions.length + '.svg', template);
  
  var length, width, height, elements, template, scale;

  scale = this.scale || 20;
  length = this.placed.length;
  elements = _.map(this.placed, function (elem, i) {
    // var color = `hsl(${Math.round(i * 360 / length)}, 100%, 50%)`;
    var color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    
    return `\t<rect x="${elem.left * scale}" y="${elem.top * scale}" fill="${color}" width="${elem.width * scale}" height="${elem.height * scale}"/>`
  }).join('\n');

  template = `\
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="${this.width * scale}px" height="${this.height * scale}px" viewBox="0 0 ${this.width * scale} ${this.height * scale}" enable-background="new 0 0 ${this.width * scale} ${this.height * scale}" xml:space="preserve">\
${elements}
</svg>`

  fs.writeFileSync('./solutions/' + this.width + 'x' + this.height + '_' + this.solutions.length + '.svg', template);
};

Solver.prototype.start = function () {
  var start, end;

  // Pass each block the start index, so we can track order.
  _.each(this.blocks, function (block, i) {
    block.i = i;
  });
  if (this.options.shuffle) {
    this.blocks = _.shuffle(this.blocks);
  }
  if (this.options.sortBySize) {
    this.blocks = _.sortBy(this.blocks, function (tile) {
      return tile.width * tile.height;
    });
  }
  // Clear current state of solutions.
  this.solutions = [];
  start = Date.now();
  this.solve();
  end = Date.now();
  console.log((end - start) / 1000, 's');
  console.log('found', this.solutions.length, 'solutions');
};

module.exports = Solver;