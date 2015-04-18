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
  this.matrix = _.fill(Array(game.width), 0);
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
Solver.prototype.solve = function (row) {
  var tile, currTile, length, i;

  // No more tiles to pop. Found a solution. Could also store
  // the solution and return false to continue search.
  if (!(length = this.blocks.length)) {
    return this.solved();
  }
  if (!row) {
    row = this.lowestCol();
  }

  for (i = 0; i < length; i++) {

    // Take the element and remove from it from the stack at current index.
    // Optimization: Move the splice to inside the if statement so it only needs
    // to be popped if we place it.
    currTile = this.blocks.splice(i, 1)[0];

    // Can the element be placed? Also check height
    if (this.place(currTile, row)) {
      // assert.notEqual(true, row.currWidth > row.width, 'Current width of row cannot be longer than width of row.');

      if (this.solve(row.currWidth !== row.width ? row : null)) {
        return true;
      }

      assert(this.pop(row), currTile, 'Should return in order.');
    }

    // Place element back on the stack.
    this.blocks.splice(i, 0, currTile);
  }

  return false;
};

Solver.prototype.place = function (tile, row) {
  var i, l, tmp;

  tmp = row.currWidth;
  row.currWidth += tile.width;
  if (!(row.currWidth <= row.width && tile.height <= row.height)) {
    row.currWidth -= tile.width;
    return false;
  }

  this.placed.unshift(tile);
  tile.left = row.pos_left + tmp;
  tile.top = row.lowest_col;
  for (i = row.pos_left + tmp, l = row.pos_left + row.currWidth; i < l; i++) {
    this.matrix[i] += tile.height;
  }
  return true;
};

Solver.prototype.pop = function (row) {
  var tile, i, l;

  if (!(tile = this.placed.shift())) {
    return null;
  }

  row.currWidth -= tile.width;

  for (i = tile.left, l = tile.left + tile.width; i < l; i++) {
    this.matrix[i] -= tile.height
  }
  tile.left = null;
  return tile;
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

Solver.prototype.lowestCol = function () {
  var lowest_col, pos_left, pos_right, grouping, height;
  lowest_col = this.height;
  grouping = false;

  for (var i = 0; i < this.matrix.length; i++) {
    if (this.matrix[i] <= lowest_col) {
      pos_right = i;

      if (!grouping || this.matrix[i] < lowest_col) {
        pos_left = i;
        grouping = true;
        lowest_col = this.matrix[i];
      }
    } else {
      grouping = false;
    }
  }
  height = this.height - lowest_col;

  // Using an array might be a micro optimzation, for now this works great.
  return {
    lowest_col: lowest_col,
    pos_left: pos_left,
    // pos_right: pos_right,
    width: height ? (pos_right - pos_left + 1) : 0,
    height: height,
    currWidth: 0
  };
};

Solver.prototype.prepare = function () {
  _.each(this.blocks, function (block, i) {
    block.i = i;
  });
};

// Method to fork the current state and delegate to different workers.
Solver.prototype.fork = function () {};

Solver.prototype.clone = function () {
  var property, copy = {};

  // For-in copy everything. Also methods.
  for (property in this) {
    if (_.isFunction(this[property])) {
      copy[property] = this[property];
    } else if (_.isObject(this[property])) {
      copy[property] = _.cloneDeep(this[property]);
    } else {
      copy[property] = this[property];
    }
  }

  return copy;
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