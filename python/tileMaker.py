class TileMaker():
	def __init__(self, numberoftiles):
		self.tiles = numberoftiles
		self.width = self.tiles
		self.height = self.tiles + 1
		self.surface = 2

	def printer(self):
		while self.tiles > 1:
			self.surface += self.width * self.height
			print "{ 'width':", self.width,", 'height':", self.height," },"
			self.tiles -= 1
			self.width -= 1
			self.height -= 1

		if self.tiles == 1:
			print "{ 'width':", self.width,", 'height':", self.height," }"
			for x in range(self.surface):
				if x * (x + 1) == self.surface:
					print 'oppervlak = ', x, " * ", x+1
					break
			print "oppervlak totaal= ", self.surface

hoi = TileMaker(20)
hoi.printer()