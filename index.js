$(document).ready(function() {
  var game = new Game();
  var message = new Message("turn", game.currentPlayer())
  $(".notice").html(message.message);
  $("li").on("click", function(event) {
    if (!game.boardWin()) {
      var $li = $(this)
      var spaceIndex = $("li").index($li);
      if (game.validMove(spaceIndex)) {
        game.placeMove(spaceIndex)
        game.renderMove(spaceIndex);
        if (game.boardWin()) {
          renderMessage(message, "win", game.currentPlayer())
          game.renderWin();
        } else if (game.remainingMoves()) {
          game.turnCount += 1;
          renderMessage(message, "turn", game.currentPlayer());
        } else {
          renderMessage(message, "draw", null);
          $(".replay").toggle();
        }
      } else {
        renderMessage(message, "invalidMove", null);
      }
    }
  });

  $(".replay").on("click", function(event) {
    game.resetBoard();
    renderMessage(message, "turn", game.currentPlayer())
  });

});
