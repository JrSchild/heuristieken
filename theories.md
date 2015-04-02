### Ideas and scribles
Keep an array with in each index the height of the column. Count this up and down
```
[2,2,4,4,4,4,3,3,3]
```

At the start of blank canvas this looks like
```
[0,0,0,0,0,0,0,0,0]
```

Get lowest row, width, length to the bottom. length to the left, and length to the right.
```
lowest_col = height 
height_free = NULL
pos_left = NULL
pos_right = NULL
grouping = False
for h, i in column_heights:
	# If we are in the lowest part of the field
	if h <= lowest_col

		# Move the right most 'cursor' and set the lowest height
		pos_right = i
		lowest_col = h

		# If this is the first column in the horizontal group, start a new one.
		if not grouping
			pos_left = i
			grouping = True

	# End group
	elif:
		grouping False
height_free = height - lowest_col - 1
```

Theoratically the entire field could look like a one, one dimensional array. When a tile gets placed on the field the tile gets popped from the stack, it comes on a new stack of placed tiles. Add the new heights of the tiles column to each index in the array and set the left position on the tile. Removing it is the reverse where it gets pushed back on the stack of tiles that need to be placed and the height is substracted in the field-array.
This is based on the assumption that all tiles will be placed on top of each other from the bottom down and that all tiles are placed with a recursive stack mechanism.

Rather than working down from the top, you could also work top-down and left-right, work on two opposite sides or even take that further and alternate clockwise with every side. The last one would be substantially more complex because multideminsional arrays need be kept with all locations. Working top-down and down-top would be easier because on both sides you have the assurance that that there are no gaps.