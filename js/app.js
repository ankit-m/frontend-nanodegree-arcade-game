var XUNIT = 101;
var YUNIT = 85;

// Enemies our player must avoid
var Enemy = function() {
    this.x = 0
    this.y = (Math.floor((Math.random() * 3)) + 0.5)*YUNIT;
    this.speed = Math.floor((Math.random() * 3) + 1)
    console.log('enemy', this.y);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += XUNIT*dt*this.speed;
    if (this.x > 505) {
      this.y = (Math.floor((Math.random() * 3)) + 0.5)*YUNIT;
      this.speed = Math.floor((Math.random() * 3) + 1)
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = 2*XUNIT;
  this.y = 4.5*YUNIT;
  this.move = '';
  this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function() {
    switch (this.move) {
      case 'right':
        this.x += XUNIT;
        break;
      case 'left':
        this.x -= XUNIT;
        break;
      case 'up':
        this.y -= YUNIT;
        break;
      case 'down':
        this.y += YUNIT;
        break;
    }
    this.move = '';
};
Player.prototype.handleInput = function(e) {
    this.move = '';
    if (e === 'right' && this.x + XUNIT < 505) {
      this.move = e;
    } else if (e === 'left' && this.x - XUNIT >= 0) {
      this.move = e;
    } else if (e === 'up' && this.y - YUNIT >= -42.5) {
      this.move = e;
    } else if (e === 'down' && this.y + YUNIT < 460) {
      this.move = e;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var numberOfEnemies = 4;
function resetEnemies() {
  allEnemies = [];
  for (var i = 0; i < numberOfEnemies; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
  }
}
resetEnemies();
player = new Player();

function checkCollisions() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (allEnemies[i].x >= player.x - XUNIT + 30 && allEnemies[i].x < player.x  && allEnemies[i].y === player.y) {
      return true;
    }
  }
}

function checkWinning() {
  if (player.y < 0) {
    return true;
  }
  return false;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
