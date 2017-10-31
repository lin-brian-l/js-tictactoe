function currentPlayerColor(player) {
  if (player === "X") {
    return "red"
  } else if (player === "O") {
    return "blue"
  }
}

function renderMove(spaceIndex, player) {
  $(".turn").eq(spaceIndex).html(player)
  $(".turn").eq(spaceIndex).css("background-color", currentPlayerColor(player))
}

function colorWin(direction, index) {
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

function renderRowWin(board) {
  board.forEach(function(row) {
    if (checkRow(row)) {
      colorWin("row", board.indexOf(row))
    }
  });
}

function renderColumnWin(board) {
  var transposedBoard = transposeBoard(board);
  transposedBoard.forEach(function(column) {
    if (checkRow(column)) {
      colorWin("column", transposedBoard.indexOf(column))
    }
  });
}

function renderDiagonalWin(board) {
  if (checkUpLeft(board)) {
    colorWin("upleft");
  } else if (checkDownLeft(board)) {
    colorWin("downleft");
  }
}

function renderWin(game) {
  if (game.diagonalWin()) {
    renderDiagonalWin(game.board);
  } else if (game.rowWin()) {
    renderRowWin(game.board);
  } else if (game.columnWin()) {
    renderColumnWin(game.board);
  };
  $(".replay").toggle();
};

function resetBoard(game) {
  game.resetGame()
  $(".turn").empty();
  $(".turn").css("background-color", "white");
  $(".replay").toggle();
}
