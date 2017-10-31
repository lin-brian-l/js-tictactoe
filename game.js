function Game() {
	this.board = [[null, null, null], [null, null, null], [null, null, null]]
	this.player1 = "X"
	this.player2 = "O"
	this.turnCount = 1
}

Game.prototype.currentPlayer = function() {
	if (this.turnCount % 2 === 1) {
		return this.player1
	} else {
		return this.player2
	}
}

Game.prototype.currentPlayerColor = function() {
	if (this.currentPlayer() === "X") {
		return "red"
	} else {
		return "blue"
	}
}

Game.prototype.placeMove = function(spaceIndex) {
	var rowNum = Math.floor(spaceIndex / 3);
	var columnNum = Math.floor(spaceIndex % 3);
	this.board[rowNum][columnNum] = this.currentPlayer();
}

Game.prototype.renderMove = function(spaceIndex) {
	$(".turn").eq(spaceIndex).html(this.currentPlayer())
	$(".turn").eq(spaceIndex).css("background-color", this.currentPlayerColor())
}

Game.prototype.validMove = function(spaceIndex) {
	var rowNum = Math.floor(spaceIndex / 3);
	var columnNum = Math.floor(spaceIndex % 3);
	if (!this.board[rowNum][columnNum]) {
		return true
	}
	return false
}

Game.prototype.rowWin = function() {
	var that = this;
	return that.board.some(function(row) {
		return that.checkRow(row) === true
	});
}

Game.prototype.checkRow = function(row) {
	return !!row.reduce(function(a, b) {
		return (a === b) ? a : NaN;
	})
}

Game.prototype.columnWin = function() {
	var that = this;
	var transposedBoard = transposeBoard(that.board);
	return transposedBoard.some(function(row) {
		return that.checkRow(row) === true
	});
}

Game.prototype.diagonalWin = function() {
	if (checkUpLeft(this.board)) {
		return true;
	} else if (checkDownLeft(this.board)) {
		return true;
	} else {
		return false;
	}
}

Game.prototype.boardWin = function() {
	return this.diagonalWin() || this.columnWin() || this.rowWin();
}

Game.prototype.colorWin = function(direction, index) {
	var coordinates;
	if (direction === "row") {
		coordinates = [index * 3, (index * 3) + 1, (index * 3) + 2];
	} else if (direction === "column") {
		coordinates = [index, index + 3, index + 6];
	} else if (direction === "upleft") {
		coordinates = [0, 4, 8];
	} else if (direction === "downleft") {
		coordinates = [2, 4, 6]
	};
	coordinates.forEach(function(element) {
		$(".turn").eq(element).css("background-color", "green");
	});
}

Game.prototype.renderRowWin = function() {
	var that = this
	that.board.forEach(function(row) {
		if (checkRow(row)) {
			that.colorWin("row", that.board.indexOf(row))
		}
	});
}

Game.prototype.renderColumnWin = function() {
	var that = this
	var transposedBoard = transposeBoard(that.board);
	transposedBoard.forEach(function(column) {
		if (checkRow(column)) {
			that.colorWin("column", transposedBoard.indexOf(column))
 		}
	});
}

Game.prototype.renderDiagonalWin = function() {
	if (checkUpLeft(this.board)) {
		this.colorWin("upleft");
	} else if (checkDownLeft(this.board)) {
		this.colorWin("downleft");
	}
}

Game.prototype.renderWin = function() {
	if (this.diagonalWin()) {
		this.renderDiagonalWin();
	} else if (this.rowWin()) {
		this.renderRowWin();
	} else if (this.columnWin()) {
		this.renderColumnWin();
	};
	$(".replay").toggle();
};

Game.prototype.remainingMoves = function() {
	if ($(".turn:empty").length === 0) {
		return false
	}
	return true
}

Game.prototype.resetBoard = function() {
	this.board = [[null, null, null], [null, null, null], [null, null, null]]
	this.turnCount = 1
	$(".turn").empty();
	$(".turn").css("background-color", "white");
	$(".replay").toggle();
}

var transposeBoard = function(array) {
	var transposedBoard = array[0].map(function(col, i) {
    var newRow = array.map(function(row) {
      return row[i]
    })
    return newRow
  })
  return transposedBoard;
}

var checkUpLeft = function(array) {
	return (array[0][0] === array[1][1] && array[1][1] === array[2][2]) && array[0][0]
}

var checkDownLeft = function(array) {
	return (array[0][2] === array[1][1] && array[1][1] === array[2][0]) && array[0][2]
}

var checkRow = function(array) {
	return ((array[0] === array[1] && array[0] === array[2]) && array[0])
}
