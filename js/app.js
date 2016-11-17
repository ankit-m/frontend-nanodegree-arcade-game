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

/**
 * Player Class. This models the player. It consists of
 * methods to handle user input, update the position
 * of the player, and render the avatar on the grid.
 */
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

// Instantiate variables
var allEnemies = [];
var numberOfEnemies = 4;

// Function to remove all enemies from the screen and
// reset their position.
function resetEnemies() {
  allEnemies = [];
  for (var i = 0; i < numberOfEnemies; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
  }
}
resetEnemies();   //call once when the game starts
player = new Player();

// Function to check if the player has collided with enemy
function checkCollisions() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (allEnemies[i].x >= player.x - XUNIT + 30 && allEnemies[i].x < player.x  && allEnemies[i].y === player.y) {
      return true;
    }
  }
}

// Function to check if the player has won
function checkWinning() {
  if (player.y < 0) {
    return true;
  }
  return false;
}

// Function to increment score on each win
function incrementScore() {
  var element = document.getElementById('score')
  var score = parseInt(element.innerText);
  score += 1;
  element.innerText = score;
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
