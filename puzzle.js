function Puzzle(width) {
	this.width = width;
	this.moveCount = 0;
	this.generate();
}

Puzzle.prototype.generate = function() {
	var length = this.width * this.width;
	this.solution = new Array(length);
	this.pieces = Array.apply(null, new Array(length)).map(Number.prototype.valueOf, 0);

	var total = 0;
	while (total < this.width) {
		for (var i = 0; i < length; i++) {
			this.solution[i] = Math.round(Math.random());
		}
		total = this.solution.reduce(function(a, b) {
			return a + b;
		});
	}

	console.log(this.solution.reduce(function(a, b) {
		return a + b;
	}));
}

Puzzle.prototype.sumColumn = function(position) {
	var total = 0;
	for (var i = 0; i < this.width; i++) {
		var index = position + (i * this.width) - 1;
		total += this.solution[index];
		total -= this.pieces[index];
	}
	return total;
}

Puzzle.prototype.sumRow = function(position) {
	var total = 0;
	for (var i = 0; i < this.width; i++) {
		var index = ((position - 1) * this.width) + i;
		total += this.solution[index];
		total -= this.pieces[index];
	}
	return total;
}

Puzzle.prototype.togglePiece = function(position) {
	var column = (position % this.width) + 1;
	var row = (Math.floor(position / this.width)) + 1;
	var value = this.pieces[position];

	if ((this.sumColumn(column) == 0 || this.sumRow(row) == 0) && value == 0) {
		return false;
	}
	if (value == 0) {
		this.pieces[position] = 1;
		++this.moveCount;
	} else {
		this.pieces[position] = 0;
	}
	return true;
}

Puzzle.prototype.complete = function() {
	var total = 0;
	for (var i = 0; i < this.width; i++) {
		total += this.sumColumn(i + 1);
		total += this.sumRow(i + 1);
	}
	return total == 0;
}