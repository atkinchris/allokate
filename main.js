function updateCounts(puzzle) {
	movesElement.innerHTML = puzzle.moveCount;
	for (var i = 0; i < puzzle.width; i++) {
		var colTotal = puzzle.sumColumn(i + 1);
		columnElements[i].innerHTML = colTotal;
		if (colTotal == 0) {
			columnElements[i].classList.add('zero')
		} else {
			columnElements[i].classList.remove('zero')
		}

		var rowTotal = puzzle.sumRow(i + 1);
		rowElements[i].innerHTML = rowTotal;
		if (rowTotal == 0) {
			rowElements[i].classList.add('zero')
		} else {
			rowElements[i].classList.remove('zero')
		}
	}
}

function setupPieces(puzzle) {
	var g = document.getElementsByClassName("piece");
	for (var i = 0, len = g.length; i < len; i++) {
		(function(index) {
			g[i].onclick = function() {
				if (puzzle.togglePiece(index)) {
					this.classList.toggle('selected');
				}
				updateCounts(puzzle);
				if (puzzle.complete()) {
					this.classList.toggle('winner');
					document.getElementById('congratulations').classList.toggle('invisible');
				}
			}
		})(i);
	}
}

var puzzle = new Puzzle(5);
var columnElements = document.getElementsByClassName("column");
var rowElements = document.getElementsByClassName("row");
var movesElement = document.getElementById("moves").lastElementChild;
document.getElementById("par").lastElementChild.innerHTML = puzzle.par;
setupPieces(puzzle);
updateCounts(puzzle);