function Message(messageType, player) {
  this.player = player
  if (messageType === "turn") {
    this.message = "It's Player " + this.player + "'s turn.";
  } else if (messageType === "win") {
    this.message = "Player " + this.player + " wins!";
  } else if (messageType === "draw") {
    this.message = "It's a draw!";
  } else if (messageType === "invalidMove") {
    this.message = "That space is already taken. Try again!";
  };
};

Message.prototype.update = function(messageType, player) {
  this.player = player
  if (messageType === "turn") {
    this.message = "It's Player " + this.player + "'s turn.";
  } else if (messageType === "win") {
    this.message = "Player " + this.player + " wins!";
  } else if (messageType === "draw") {
    this.message = "It's a draw!";
  } else if (messageType === "invalidMove") {
    this.message = "That space is already taken. Try again!";
  };
}
