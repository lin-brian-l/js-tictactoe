$(document).ready(function() {
	var game = new Game();
	$("li").on("click", function(event) {
		var $li = $(this)
		var spaceIndex = $("li").index($li);
		if (game.validMove(spaceIndex)) {
			game.placeMove(spaceIndex)
			game.renderMove(spaceIndex);
			console.log(game.currentPlayer());
			if (game.boardWin()) {
				console.log("winner", game.currentPlayer())
			}
			game.turnCount += 1
		} else {
			console.log("Derp")
		}
		console.log(game.board)
		console.log("row", game.rowWin())
		console.log("col", game.columnWin())
		console.log("diag", game.diagonalWin())
		console.log("board", game.boardWin())
	});
});


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
	console.log($(".turn"))
	$($(".turn")[spaceIndex]).html(this.currentPlayer())
	$($(".turn")[spaceIndex]).css("background-color", this.currentPlayerColor())
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

Game.prototype.diagonalWin = function() {
	if ((this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) && this.board[0][0]) {
		return true;
	} else if ((this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) && this.board[0][2]) {
		return true;
	} else {
		return false;
	}
}

Game.prototype.boardWin = function() {
	return this.diagonalWin() || this.columnWin() || this.rowWin()
}

// var rowWin = function(array) {
// 	return array.some(function(row, index, array) {
// 		return checkRow(row)
// 	});
// }

// var checkRow = function(row) {
// 	return !!row.reduce(function(a, b) {
// 		return (a === b) ? a : NaN;
// 	})
// }