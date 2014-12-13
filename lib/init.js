(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Init = Asteroids.Init = function (ctx) {
    this.ctx = ctx;

    this.newGame();
    this.bindKeyHandlers();
  }

  Init.prototype.bindKeyHandlers = function () {
    var init = this;

    key("r", function () { init.newGame() });
  }

  Init.prototype.newGame = function () {
    var self = this;
    var game = new Asteroids.Game();

    new Asteroids.GameView(game, self.ctx).start();
  }
})();
