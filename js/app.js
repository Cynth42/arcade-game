//player and enemy inherits from parent construction function
class Entity {
 constructor () {
    this.xaxis = 101;
    this.yaxis = 83;
    this.beginX = this.xaxis * 2;
    this.beginY = (this.yaxis * 4) + 55;
    this.sprite =  "images/";
  }
//render player and enemy on the screen
render() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemies our player must avoid: enemy constructor function
class Enemy extends Entity {
  constructor(x, y, speed)  {
  //super constructor alter's parent's class
    super();
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite += "enemy-bug.png";
  }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
 update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
    this.x += this.speed * dt;
    }
    else {
   this.x = -101;
   }
  }
}

//create player constructor function
class Player  extends Entity{
  constructor () {
    //super constructor alter's parent's class
    super();
    this.x = this.beginX;
    this.y = this.beginY;
    this.wins = false;
    this.sprite += "char-princess-girl.png";
  }

//when enemy is close enough to player's x and y locations collide move 
// player back to start position & checksIfGameOver and render modal
  update() {
    for (let enemy of allEnemies) {
      if (enemy.x + (this.xaxis/2) > player.x &&
      enemy.x < player.x + (this.xaxis/2) && (enemy.y === player.y)) {
      player.resetPlayer();
      }
    }
    //check if player reached river
   if (player.y === 55) {
       player.wins = true;
    }
  }
 //handleInput() method: creates Player's movement
  handleInput(keypress) {
    switch(keypress) {
      case 'left':
        this.x = this.x > 0 ? this.x - this.xaxis : this.x;
        break;
      case 'up':
        this.y = this.y > 0 ? this.y - this.yaxis : this.y;
        break;
      case 'right':
        this.x = this.x < 4 * this.xaxis ? this.x + this.xaxis : this.x;
        break;
      case 'down':
        this.y = this.y < 4 * this.yaxis ? this.y + this.yaxis : this.y;
        break;
      default:
        break;
      }
  }
 //reset player back to starting position on x and y axis
  resetPlayer() {
    this.x = this.beginX;
    this.y = this.beginY;
  }
}

//Create player instance
const player = new Player();

// all enemy objects is placed in an array called allEnemies
const allEnemies = [];

//Create instances of all enemies
// Enemy parameters
const enemy1 =new Enemy(-101, 0, 400);
const enemy2 = new Enemy(-101, 83, 400);
const enemy3 = new Enemy(-252.5, 83, 400);
const enemy4 = new Enemy(-303, 175, 300);
allEnemies.push(enemy1, enemy2, enemy3, enemy4);
console.log(allEnemies);

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
