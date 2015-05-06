# game = { #tegelset2
#     'width': 23,
#     'height': 27,
#     'tiles': [
#  { 'width': 3,  'height': 6 },
#  { 'width': 4,  'height': 10 },
#  { 'width': 7,  'height': 6 },
#  { 'width': 9,  'height': 8 },
#  { 'width': 10, 'height': 10 },
#  { 'width': 9,  'height': 9 },
#  { 'width': 8,  'height': 8 },
#  { 'width': 8,  'height': 8 },
#  { 'width': 7,  'height': 7 },
#  { 'width': 6,  'height': 6 },
#  { 'width': 5,  'height': 5 },
#  { 'width': 4,  'height': 4 },
#  { 'width': 3,  'height': 3 },
#  { 'width': 2,  'height': 2 },
#  { 'width': 1,  'height': 1 },
#  ]
# };
# game = { #tegelset 3
#     'width': 55,
#     'height': 56,
#     'tiles': [
#  { 'width': 20, 'height': 21 },
#  { 'width': 19, 'height': 20 },
#  { 'width': 19, 'height': 18 },
#  { 'width': 18, 'height': 17 },
#  { 'width': 16, 'height': 17 },
#  { 'width': 16, 'height': 15 },
#  { 'width': 14, 'height': 15 },
#  { 'width': 14, 'height': 13 },
#  { 'width': 12, 'height': 13 },
#  { 'width': 12, 'height': 11 },
#  { 'width': 10, 'height': 11 },
#  { 'width': 9,  'height': 10 },
#  { 'width': 9,  'height': 8 },
#  { 'width': 7,  'height': 8 },
#  { 'width': 7,  'height': 6 },
#  { 'width': 6,  'height': 5 },
#  { 'width': 5,  'height': 4 },
#  { 'width': 4,  'height': 3 },
#  { 'width': 2,  'height': 3 },
#  { 'width': 1,  'height': 2 }
#  ]
# }

game = { #tegelset advanced
    'width': 119,
    'height': 120,
    'tiles': [
{ 'width': 34 , 'height': 35  },
{ 'width': 33 , 'height': 34  },
{ 'width': 32 , 'height': 33  },
{ 'width': 31 , 'height': 32  },
{ 'width': 30 , 'height': 31  },
{ 'width': 29 , 'height': 30  },
{ 'width': 28 , 'height': 29  },
{ 'width': 27 , 'height': 28  },
{ 'width': 26 , 'height': 27  },
{ 'width': 25 , 'height': 26  },
{ 'width': 24 , 'height': 25  },
{ 'width': 23 , 'height': 24  },
{ 'width': 22 , 'height': 23  },
{ 'width': 21 , 'height': 22  },
{ 'width': 20 , 'height': 21  },
{ 'width': 19 , 'height': 20  },
{ 'width': 18 , 'height': 19  },
{ 'width': 17 , 'height': 18  },
{ 'width': 16 , 'height': 17  },
{ 'width': 15 , 'height': 16  },
{ 'width': 14 , 'height': 15  },
{ 'width': 13 , 'height': 14  },
{ 'width': 12 , 'height': 13  },
{ 'width': 11 , 'height': 12  },
{ 'width': 10 , 'height': 11  },
{ 'width': 9 , 'height': 10  },
{ 'width': 8 , 'height': 9  },
{ 'width': 7 , 'height': 8  },
{ 'width': 6 , 'height': 7  },
{ 'width': 5 , 'height': 6  },
{ 'width': 4 , 'height': 5  },
{ 'width': 3 , 'height': 4  },
{ 'width': 2 , 'height': 3  },
{ 'width': 1 , 'height': 2  }
]
}

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


            # if tile != None:
            #     self.swap(tile)
            #     self.swaps += 1
            #     if self.place(tile, row):
            #         self.placedtiles.append(tile)
            #         self.tiles[index] = None

            #         if self.solve():
            #             return True
            #         self.placedtiles.pop()
            #         self.tiles[index] = tile
            #         self.remove(tile, row)
            #     self.swap(tile)
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

    def swap(self,tile):
        tile['width'], tile['height'] = tile['height'], tile['width']

    def surfaceCalc(self, tiles):
        for tile in self.tiles:
            self.surface += tile['width'] * tile['height']
        return self.surface

b = BaseSolver(game)
surface = b.surfaceCalc(b.tiles)
solved = b.solve()

print b.matrix, b.placedtiles, b.swaps, b.surface


# row = b.findLowcation()
# print 'row contains:', row
# place = b.place(b.tiles[0],b.findLowcation())
# print 'placing is completed:', place
# updatedrow = b.findLowcation()
# print 'row contains:', updatedrow