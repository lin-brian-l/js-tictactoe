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

Game.prototype.transposeBoard = function() {
	var that = this
	var transposedBoard = that.board[0].map(function(col, i) {
    var newRow = that.board.map(function(row) {
      return row[i]
    })
    return newRow
  })
  return transposedBoard;
}

Game.prototype.columnWin = function() {
	var that = this;
	var transposedBoard = that.transposeBoard();
	return transposedBoard.some(function(row) {
		return that.checkRow(row) === true
	});
}

Game.prototype.checkUpLeft = function() {
	return (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) && this.board[0][0]
}

Game.prototype.checkDownLeft = function() {
	return (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) && this.board[0][2]
}

Game.prototype.diagonalWin = function() {
	if (this.checkUpLeft()) {
		return true;
	} else if (this.checkDownLeft()) {
		return true;
	} else {
		return false;
	}
}

Game.prototype.boardWin = function() {
	return this.diagonalWin() || this.columnWin() || this.rowWin();
}

Game.prototype.colorWin = function(direction, rowIndex) {
	var spaceIndex;
	var coordinates;
	if (direction === "row") {
		spaceIndex = rowIndex * 3;
		coordinates = [spaceIndex, spaceIndex + 1, spaceIndex + 2];
	} else if (direction === "column") {
		spaceIndex = rowIndex;
		coordinates = [spaceIndex, spaceIndex + 3, spaceIndex + 6];
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
		if ((row[0] === row[1] && row[0] === row[2]) && row[0]) {
			that.colorWin("row", that.board.indexOf(row))
		}
	});
}

Game.prototype.renderColumnWin = function() {
	var that = this
	var transposedBoard = this.transposeBoard();
	transposedBoard.forEach(function(column) {
		if ((column[0] === column[1] && column[0] === column[2]) && column[0]) {
			that.colorWin("column", transposedBoard.indexOf(column))
 		}
	});
}

Game.prototype.renderDiagonalWin = function() {
	if (this.checkUpLeft()) {
		this.colorWin("upleft");
	} else if (this.checkDownLeft()) {
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
