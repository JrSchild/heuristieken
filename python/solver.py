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
        self.height = game['height']
        self.tiles = game['tiles']
        self.matrix = [1,1,1,1,2,2,2,3,4,4,4]
        # self.matrix = [0 for x in range(self.width)]
    def solve(self):
        return 1;
    def findLowcation(self):
        lowest = min(self.matrix)
        lowlength = 0
        index = self.matrix.index(lowest)
        positionleft = index
        while index < len(self.matrix) and self.matrix[index] == lowest:
            index += 1
            lowlength += 1
        return {'positionleft': positionleft, 'lowest': lowest, 'lowlength':lowlength, 'height':self.height - lowest}

    def can_place(self, tile, row):
        return tile['width'] <= row['lowlength'] and tile['height'] <= row['height']

    def remove(self, tile, row):
        colsleft, placeposition = tile['width'], row['positionleft']
        while colsleft > 0:
            self.matrix[placeposition] -= tile['height']
            placeposition += 1
            colsleft -= 1
        return True

    def place(self, tile, row):
        if not self.can_place(tile, row):
            return False
        colsleft, placeposition = tile['width'], row['positionleft']
        while colsleft > 0:
            self.matrix[placeposition] += tile['height']
            placeposition += 1
            colsleft -= 1
        return True

b = BaseSolver(game)
row = b.findLowcation()
print 'row contains:', row
place = b.place(b.tiles[0],b.findLowcation())
print 'placing is completed:', place
updatedrow = b.findLowcation()
print 'row contains:', updatedrow