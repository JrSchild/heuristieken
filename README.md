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

[Some more scribles and ideas](./theries.md)

### Links
- http://mathworld.wolfram.com/PerfectSquareDissection.html
- http://prime.vc/documentation/layout_algorithms.html#_tiles
- http://stackoverflow.com/questions/10154775/dynamic-programming-tiles
- http://apps.topcoder.com/forums/?module=Thread&threadID=697369&start=0&mc=19#msgBody1327576
- http://www.iarcs.org.in/inoi/online-study-material/topics/dp-tiling.php
- http://math.stackexchange.com/questions/664113/count-the-ways-to-fill-a-4-times-n-board-with-dominoes
- http://www.netlib.org/lapack/lawnspdf/lawn243.pdf
- https://www.google.nl/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=programming%20dynamic-tile%20algorithm
- https://www.google.nl/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=algorithm%20tile%20placement
