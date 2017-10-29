$(document).ready(function() {
	var game = new Game();
	$("li").on("click", function(event) {
		var $li = $(this)
		var spaceIndex = $("li").index($li);
		game.placeMove(spaceIndex)
		game.turnCount += 1
		console.log(game.board)
		console.log("row", game.rowWin())
		console.log("col", game.columnWin())
	});
});


function Game() {
	this.board = [[null, null, null], [null, null, null], [null, null, null]]
	this.player1 = "X"
	this.player2 = "O"
	this.turnCount = 1
}

Game.prototype.placeMove = function(spaceIndex) {
	var rowNum = Math.floor(spaceIndex / 3);
	var columnNum = Math.floor(spaceIndex % 3);
	if (this.turnCount % 2 === 1) {
		this.board[rowNum][columnNum] = this.player1;
	} else {
		this.board[rowNum][columnNum] = this.player2;
	}
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