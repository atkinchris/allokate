function generatePuzzle() {
	var myStringArray = new Array(width * width);
	var arrayLength = myStringArray.length;
	var total = 0;

	while (total < width) {
		for (var i = 0; i < arrayLength; i++) {
			myStringArray[i] = Math.round(Math.random());
		}
		total = myStringArray.reduce(function(a, b) {
			return a + b;
		});
	}

	return myStringArray;
}

function updateCounts(puzzle) {
	columns = columns.map(Number.prototype.valueOf, 0);
	rows = rows.map(Number.prototype.valueOf, 0);
	for (var i = 0; i < puzzle.length; i++) {
		var value = puzzle[i];
		rows[Math.floor(i / width)] += value;
		columns[i % width] += value;
	}

	for (var i = 0; i < width; i++) {
		columnElements[i].innerHTML = columns[i];
		rowElements[i].innerHTML = rows[i];
	}
}

function zeroArray(length) {
	return Array.apply(null, new Array(length)).map(Number.prototype.valueOf, 0);
}

function togglePiece(position) {
	var value = pieceArray[position];
	pieceArray[position] = value == 0 ? 1 : 0;
	updateCounts(pieceArray);
}

function setupPieces() {
	var g = document.getElementsByClassName("piece");
	for (var i = 0, len = g.length; i < len; i++) {
		(function(index) {
			g[i].onclick = function() {
				togglePiece(index);
				this.classList.toggle('selected');
			}
		})(i);
	}
}

var width = 5;

var puzzleArray = generatePuzzle();
var pieceArray = zeroArray(width * width);
var columnElements = document.getElementsByClassName("column");
var rowElements = document.getElementsByClassName("row");
var rows = zeroArray(width);
var columns = zeroArray(width);
setupPieces();
updateCounts(puzzleArray);