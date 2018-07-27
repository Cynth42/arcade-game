


/*jshint esversion: 6 */
//player and enemy inherits from parent construction function
//(function(global) {
'use Strict';

/**
 * @desc Superclass holds common functionalities
 * of Player{} and Enemy{} 
 */
class Character {
  constructor () {
    this.xaxis = 101;
    this.yaxis = 83;
    this.beginX = this.xaxis * 2;
    this.beginY = (this.yaxis * 4) + 55;
    this.sprite =  "images/";
  }
//draw player and enemy on the screen
render() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/**
 * Enemies our player must avoid
 *
 * @param {int} x - x coord position
 * @param {int} y - y coord position
 * @param {int} speed - movement speed
 */
class Enemy extends Character {
  constructor(x, y, speed)  {
    super();
    this.x = x;
    // y === 0 plus offset 55 pixels
    this.y = y + 55;
    this.speed = speed;
    this.sprite += "enemy-bug.png";
  }

/**
 * updates Enemy position 
 *
 * @param {int} dt - DeltaTime - a time
 * delta between ticks
 */
update(dt) {
    if (this.x < 505) {
      this.x += this.speed * dt;
    }
    else {
      this.x = -101;
   }
  }
}

/**
 * Player character
 *
 * @param {int} x - x coord position
 * @param {int} y - y coord position
 * @param {string} sprite - Player sprite
 */
class Player extends Character {
  constructor () {
    super();
    this.x = this.beginX;
    this.y = this.beginY;
    this.wins = false;
    this.sprite += "char-princess-girl.png";
  }

/**
 * when enemy is close enough to
 * player's x/y location collide, move
 * player back to start position,
 * checksIfGameOver and render modal
 */
  update() {
    for (let enemy of allEnemies) {
      if (enemy.x + 83 > player.x &&
      enemy.x < player.x + 83 && (enemy.y === player.y)) {
      player.resetPlayer();
     }
   }
    //check if player reached river
    if (player.y === 55) {
       player.wins = true;
    }
  }

/**
 * Player's movement
 *
 * @param {string} key - String of directions that add * movement to
 */
 handleInput(keypress) {
    switch(keypress) {
      case 'left':
        this.x = this.x > 0 ? this.x - 101 : this.x;
        break;
      case 'up':
        this.y = this.y > 0 ? this.y - 83: this.y;
        break;
      case 'right':
        this.x = this.x < 4 * 101 ? this.x + 101: this.x;
        break;
      case 'down':
        this.y = this.y < 4 * 83 ? this.y + 83 : this.y;
        break;
      default:
        break;
    }
  }

//resets player back to starting coords
  resetPlayer() {
    this.x = this.beginX;
    this.y = this.beginY;
  }
}

//Create player instance
const player = new Player();

//Create instances of all enemies
const enemy1 = new Enemy(-101, 0, 400);
const enemy2 = new Enemy(-101, 83, 400);
const enemy3 = new Enemy(-252.5, 83, 400);
const enemy4 = new Enemy(-303, 166, 375);


//all enemy objects is placed in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4];
console.log(allEnemies);

/**
 * This listens for key presses
 * sends the keys to your
 *  Player.handleInput() method.
 * You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
})



