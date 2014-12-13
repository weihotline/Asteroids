(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.earth = [];
    this.score = 0;
    this.isOver = false;

    this.addEarth();
    this.addAsteroids();
  };

  Game.IMGURL = 'images/space.jpg';
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else if (object instanceof Asteroids.Earth) {
      this.earth.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.addEarth = function () {
    var earth = new Asteroids.Earth({
      game: this
    });

    this.add(earth);

    return earth;
  }

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: [Game.DIM_X/2, Game.DIM_Y-100],
      game: this
    });

    this.add(ship);

    return ship;
  };

  Game.prototype.allObjects = function () {
    return []
      .concat(this.ships)
      .concat(this.earth)
      .concat(this.asteroids)
      .concat(this.bullets);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.draw = function (ctx) {
    var self = this;
    var img = new Image();
    img.src = Game.IMGURL;

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      ctx.font = "30pt Calibri";
      ctx.fillStyle = "salmon";
      ctx.fillText("Score: " + self.score, 10, 50);
      if (self.isOver) {
        ctx.fillText("Game Over", 400, 300);
      }

      ctx.font = "12pt Calibri";
      ctx.fillText("Protect the earth from hitting by asteroids!", 380, 30);
      ctx.fillText("[W, S, A, D for spaceship motion]", 410, 50);
      ctx.fillText("[SPACE to shoot, R for restart]", 420, 70);
    }

    this.allObjects().forEach(function (object) {
      if (object instanceof Asteroids.Ship) {
        if (self.isOutOfBounds(object.pos)) {
          object.relocate();
        }
      }

      object.draw(ctx);
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0)
      || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    var self = this;

    this.allObjects().forEach(function (object) {
        object.move();
    });
  };

  Game.prototype.randomPosition = function () {
    return [
      200 + (Game.DIM_X-200) * Math.random(),
      (Game.DIM_Y-200) * Math.random()
    ];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids[idx] = new Asteroids.Asteroid({ game: this });
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };
})();
