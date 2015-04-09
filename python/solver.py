game = {
    'width': 17,
    'height': 17,
    'tiles': [
        { 'width': 4, 'height': 4 },
        { 'width': 4, 'height': 4 },
        { 'width': 2, 'height': 2 },
        { 'width': 2, 'height': 2 },
        { 'width': 2, 'height': 2 },
        { 'width': 2, 'height': 2 }
    ]
}
class BaseSolver():
    def __init__(self, game):
        self.width = game['width']
        self.height = game['width']
        self.tiles = game['tiles']
        self.matrix = [1,1,1,2,2,2,3,4,4,4]
        # self.matrix = [0 for x in range(self.width)]
    def solve(self):
        return 1;
    def findLow(self):
        lowest = min(self.matrix)
        lowlength = 0
        index = self.matrix.index(lowest)
        positionleft = index
        while index < len(self.matrix) and self.matrix[index] == lowest:
            index += 1
            lowlength += 1
        return positionleft, lowest, lowlength, self.height - lowest

    # def canPlace(self, tile, x, y)
    #     if (!can_place(tile, left, top)):
    #     	return False
    #     tile.left = left
    #     tile.top = top
    #     for
    #     return False
    # def remove(self, tile):
    #     # Implementation
    #     return False

b = BaseSolver(game)
print b.findLow()