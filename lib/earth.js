(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Earth = Asteroids.Earth = function (options) {
    options.radius = Earth.RADIUS;
    options.imgUrl = Earth.IMGURL;
    options.vel = Earth.VEL;
    options.pos = Earth.POS;

    Asteroids.MovingObject.call(this, options);
  };

  Earth.RADIUS = 45;
  Earth.SPEED = 0;
  Earth.POS = [50, 300];
  Earth.VEL = [0, 0];
  Earth.IMGURL = 'images/earth.png';

  Asteroids.Util.inherits(Earth, Asteroids.MovingObject);

  Earth.prototype.collideWith = function (otherObject) {
    if (!(otherObject instanceof Asteroids.Bullet)) {
      this.game.isOver = true;
      otherObject.remove();
    }
  }
})();
