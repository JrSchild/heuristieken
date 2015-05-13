### Define Base classes for the puzzles.
A tile solver written in python and nodejs.

#### Each puzzle has the same configuration.
```python
Game = {
	'width': 6,
	'height': 8,
	'blocks': [
		{ 'width': 4, 'height': 4 },
		{ 'width': 4, 'height': 4 },
		{ 'width': 2, 'height': 2 },
		{ 'width': 2, 'height': 2 },
		{ 'width': 2, 'height': 2 },
		{ 'width': 2, 'height': 2 }
	]
}
```

#### TODO
- Rewrite findLowcation to use a single loop rather than four (min(), matrix.index(), len(), while). Only a single incrementer could be used. Is returning a list faster than a dict?  
- ~~can_place is called twice, first in solve() then in place(). Just call place() immediately. Maybe can_place could be implemented into place, saves an extra function call.~~  
- ~~place and remove can be optimized with a single incrementer/decrementer.~~  
- `if len(self.placedtiles) == len(self.tiles):` can be optimized. Cache the total length of self.tiles. Use counter to store the length of placedtiles (benchmark first)
- Is it faster/even possible to cache the value of `enumerate(self.tiles)` in solve()?
- ~~Move game configurations to external files.~~

[Some more scribles and ideas](./theories.md)

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
