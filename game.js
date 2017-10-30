$(document).ready(function() {
	var game = new Game();
	var message = "It's Player " + game.currentPlayer() + "'s turn.";
	game.renderNotice(message);
	$("li").on("click", function(event) {
		if (!game.boardWin()) {
			var $li = $(this)
			var spaceIndex = $("li").index($li);
			if (game.validMove(spaceIndex)) {
				game.placeMove(spaceIndex)
				game.renderMove(spaceIndex);
				if (game.boardWin()) {
					message = "Player " + game.currentPlayer() + " wins!"
					game.renderNotice(message)
					game.renderWin();
				} else if (game.remainingMoves()) {
					game.turnCount += 1;
					message = "It's Player " + game.currentPlayer() + "'s turn.";
					game.renderNotice(message);
				} else {
					message = "It's a draw!";
					game.renderNotice(message);
					$(".replay").toggle();
				}
			} else {
				game.renderNotice("That space is already taken. Try again!")
			}
		}
	});

	$(".replay").on("click", function(event) {
		game.resetBoard();
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

Game.prototype.renderNotice = function(text) {
	$(".notice").html(text)
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
	return this.diagonalWin() || this.columnWin() || this.rowWin();
}

Game.prototype.renderRowWin = function() {
	var that = this
	that.board.forEach(function(row) {
		if ((row[0] === row[1] && row[0] === row[2]) && row[0]) {
			var spaceIndex = that.board.indexOf(row) * 3;
			$($(".turn")[spaceIndex]).css("background-color", "green");
			$($(".turn")[spaceIndex + 1]).css("background-color", "green");
			$($(".turn")[spaceIndex + 2]).css("background-color", "green");
		}
	});
}

Game.prototype.renderColumnWin = function() {
	var transposedBoard = this.transposeBoard(); 
	transposedBoard.forEach(function(column) {
		if ((column[0] === column[1] && column[0] === column[2]) && column[0]) {
			var spaceIndex = transposedBoard.indexOf(column);
			$($(".turn")[spaceIndex]).css("background-color", "green");
			$($(".turn")[spaceIndex + 3]).css("background-color", "green");
			$($(".turn")[spaceIndex + 6]).css("background-color", "green");
		}
	});
}

Game.prototype.renderDiagonalWin = function() {
	if ((this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) && this.board[0][0]) {
		$($(".turn")[0]).css("background-color", "green");
		$($(".turn")[4]).css("background-color", "green");
		$($(".turn")[8]).css("background-color", "green");
	} else if ((this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) && this.board[0][2]) {
		$($(".turn")[2]).css("background-color", "green");
		$($(".turn")[4]).css("background-color", "green");
		$($(".turn")[6]).css("background-color", "green");	
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
	var message = "It's Player " + this.currentPlayer() + "'s turn.";
	this.renderNotice(message);
	$(".replay").toggle();
}