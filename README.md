### Define Base classes for the puzzles.

#### Each puzzle has the same configuration.
```
Game = {
  width: 6,
  height: 8,
  blocks: [
    { width: 4, height: 4 },
    { width: 4, height: 4 },
    { width: 2, height: 2 },
    { width: 2, height: 2 },
    { width: 2, height: 2 },
    { width: 2, height: 2 }
  ]
}
```

#### Base solver class
```
class BaseSolver():
  def __init__(self, game):
    self.width = game.width
    self.height = game.height
    self.blocks = game.blocks
    self.matrix = [[NULL for y in range(self.height)] for x in range(self.width)]
  def solve(self):
    throw NotImplementedError
  def place(self, tile, x, y):
    # Implementation
    return False
  def can_place(self, tile, x, y):
    # Implementation
    return False
  def remove(self, tile):
    # Implementation
    return False
```

#### Specific solver classes with diferent algorithms
```
class Solver1(BaseSolver):
  def solve(self):
    # Implementation
  def helper_method(self):
    # Example helper
```