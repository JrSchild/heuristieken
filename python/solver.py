'''
width, height, blocks, matrix = 3, 3, 2, 0
print (width)
def initialize():
  for x in width
    matrix[x] = []
    for y in height
      matrix[x][y] = null
'''
class Stack(object):

    # the list that is used as stack and the length variable are initialized
  def __init__(self):
    self.stored = []
    self.length = 0
    self.empty = "The stack is empty"

  def push(self, number):
    # add user input to list, keep track of length
    self.stored.append(number)
    self.length += 1

  def pop(self):
    # only remove when there is an item in stack
    if self.length == 0:
        print (self.empty)
    else:
        # pop last item of the list (top of stack), keep track of length
        self.length -= 1
        return self.stored.pop()
'''

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
  // tile.left = null;
  // tile.right = null;
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

module.exports = function (config) {
  height = config.height;
  width = config.width;
  blocks = config.blocks;
  matrix = [];

  return {
    initialize: initialize,
    solve: function () {
      var now = Date.now();
      startPlacing();
      console.log(blocks.length ? 'not' : '', 'solved in', (Date.now() - now) / 1000, 's' );
    },
    print: print_matrix
  };
};

'''