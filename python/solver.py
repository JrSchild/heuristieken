
class BaseSolver():
    def __init__(self, game):
        self.width = game['width']
        self.height = game['height']
        self.tiles = game['tiles']
        self.placedtiles = []
        self.matrix = [0 for x in range(self.width)]
        self.swaps = 0
        self.surface = 0
    def solve(self):

        if len(self.placedtiles) == len(self.tiles):
            return True
        row = self.findLowcation()
        
        for index, tile in enumerate(self.tiles):
            if tile != None and self.place(tile, row):
                self.placedtiles.append(tile)
                self.tiles[index] = None

                if self.solve():
                    return True
                self.placedtiles.pop()
                self.tiles[index] = tile
                self.remove(tile, row)


            if tile != None:
               tile['width'], tile['height'] = tile['height'], tile['width']
               if self.place(tile, row):
                   self.placedtiles.append(tile)
                   self.tiles[index] = None
            
                   if self.solve():
                       return True
                   self.placedtiles.pop()
                   self.tiles[index] = tile
                   self.remove(tile, row)
               tile['width'], tile['height'] = tile['height'], tile['width']
        return False

    def findLowcation(self):
        lowest = min(self.matrix)
        lowlength = 0
        index = self.matrix.index(lowest)
        positionleft = index
        while index < self.width and self.matrix[index] == lowest:
            index += 1
            lowlength += 1
        return {'positionleft': positionleft, 'lowest': lowest, 'lowlength':lowlength, 'height':self.height - lowest}

    def remove(self, tile, row):
        placeposition = row['positionleft']
        for row in range(tile['width']):
            self.matrix[placeposition] -= tile['height']
            placeposition += 1
        return True

    def place(self, tile, row):
        if (tile['width'] <= row['lowlength'] and tile['height'] <= row['height']) == False:
            return False

        placeposition = row['positionleft']
        for row in range(tile['width']):
            self.matrix[placeposition] += tile['height']
            placeposition += 1
        return True

    def turn(self,tile):
        tile['width'], tile['height'] = tile['height'], tile['width']

from games.game23x27 import game
# from games.game55x56 import game
# from games.game119x120 import game
b = BaseSolver(game)
solved = b.solve()

print b.matrix, "\n", b.placedtiles,"\n", "swaps = ", b.swaps


# row = b.findLowcation()
# print 'row contains:', row
# place = b.place(b.tiles[0],b.findLowcation())
# print 'placing is completed:', place
# updatedrow = b.findLowcation()
# print 'row contains:', updatedrow