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

Game.prototype.placeMove = function(spaceIndex) {
	var rowNum = Math.floor(spaceIndex / 3);
	var columnNum = Math.floor(spaceIndex % 3);
	this.board[rowNum][columnNum] = this.currentPlayer();
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

Game.prototype.remainingMoves = function() {
	if ($(".turn:empty").length === 0) {
		return false
	}
	return true
}

Game.prototype.resetGame = function() {
	this.board = [[null, null, null], [null, null, null], [null, null, null]]
	this.turnCount = 1
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
