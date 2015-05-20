
class BaseSolver():
    def __init__(self, game):
        self.width = game['width']
        self.height = game['height']
        self.tiles = game['tiles']
        self.totaltiles = len(self.tiles) 
        self.placedtiles = []
        self.matrix = [0 for x in range(self.width)]
        self.swaps = 0
        self.runs = 0
        self.stop = 0

    def solve(self):
        self.runs += 1
        if len(self.placedtiles) == self.totaltiles:
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

            # SWAPPING PART
            # if tile != None:
            #    tile['width'], tile['height'] = tile['height'], tile['width']
            #    if self.place(tile, row):
            #        self.placedtiles.append(tile)
            #        self.tiles[index] = None
            
            #        if self.solve():
            #            return True
            #        self.placedtiles.pop()
            #        self.tiles[index] = tile
            #        self.remove(tile, row)
            #    tile['width'], tile['height'] = tile['height'], tile['width']

        return False

    def findLowcation(self):
        index, count, lowlength, lowest = 0, 0, 0, self.height
        for row in self.matrix:
            if row < lowest:
                lowest, index, lowlength = row, count, 0
            count += 1
            if row == lowest:
                lowlength += 1
        # lowest = min(self.matrix)
        # lowlength = 0
        # positionleft = self.matrix.index(lowest)
        # index = positionleft
        # while positionleft < self.width and self.matrix[positionleft] == lowest:
        #     positionleft += 1
        #     lowlength += 1


        #debugging purposes, whats the difference?
        if self.stop < 10:
            print index, lowest, lowlength, self.height - lowest
            self.stop += 1

        return {'positionleft': index, 'lowest': lowest, 'lowlength':lowlength, 'height':self.height - lowest}

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

# from games.game23x27 import game
from games.game23x27 import game
# from games.game119x120 import game


b = BaseSolver(game)
solved = b.solve()

print b.matrix, "\n", b.placedtiles,"\nswaps = ", b.swaps, "\nruns of solve:", b.runs


# row = b.findLowcation()
# print 'row contains:', row
# place = b.place(b.tiles[0],b.findLowcation())
# print 'placing is completed:', place
# updatedrow = b.findLowcation()
# print 'row contains:', updatedrow