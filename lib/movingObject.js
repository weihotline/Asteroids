(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.imgUrl = options.imgUrl;
    this.game = options.game;
  };

  MovingObject.prototype.collideWith = function (otherObject) {};

  MovingObject.prototype.draw = function (ctx) {
    var img = new Image();
    var self = this;

    img.onload = function () {
      ctx.drawImage(img, self.pos[0] - this.width/2, self.pos[1] - this.height/2);
    }

    img.src = this.imgUrl;
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Asteroids.Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.game.isOutOfBounds(this.pos)) {
      if (!(this instanceof Asteroids.Ship)) {
        this.remove();
      }
    }
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();
