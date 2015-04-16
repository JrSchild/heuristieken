game = {
    'width': 55,
    'height': 56,
    'tiles': [
 { 'width': 20, 'height': 21 },
 { 'width': 19, 'height': 20 },
 { 'width': 19, 'height': 18 },
 { 'width': 18, 'height': 17 },
 { 'width': 16, 'height': 17 },
 { 'width': 16, 'height': 15 },
 { 'width': 14, 'height': 15 },
 { 'width': 14, 'height': 13 },
 { 'width': 12, 'height': 13 },
 { 'width': 12, 'height': 11 },
 { 'width': 10, 'height': 11 },
 { 'width': 9,  'height': 10 },
 { 'width': 9,  'height': 8 },
 { 'width': 7,  'height': 8 },
 { 'width': 7,  'height': 6 },
 { 'width': 6,  'height': 5 },
 { 'width': 5,  'height': 4 },
 { 'width': 4,  'height': 3 },
 { 'width': 2,  'height': 3 },
 { 'width': 1,  'height': 2 }
 ]
}
class BaseSolver():
    def __init__(self, game):
        self.width = game['width']
        self.height = game['height']
        self.tiles = game['tiles']
        self.placedtiles = []
        self.matrix = [0 for x in range(self.width)]
    def solve(self):
        if len(self.placedtiles) == len(self.tiles):
            return True

        row = self.findLowcation()
        for index, tile in enumerate(self.tiles):
            if tile != None and self.can_place(tile, row) == True:
                self.place(tile, row)
                self.placedtiles.append(tile)
                self.tiles[index] = None
                if self.solve():
                    return True

                self.placedtiles.pop()
                self.tiles[index] = tile
                self.remove(tile, row)
        return False

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
solved = b.solve()

print b.matrix, b.placedtiles


# row = b.findLowcation()
# print 'row contains:', row
# place = b.place(b.tiles[0],b.findLowcation())
# print 'placing is completed:', place
# updatedrow = b.findLowcation()
# print 'row contains:', updatedrow