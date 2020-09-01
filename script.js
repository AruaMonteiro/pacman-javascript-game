/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-useless-return */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const squareSide = 20;
let score = 0;

// 0 - wall
// 1 - pacdot
// 2 - empty
// 3 - powerup
// 4 - pacman
// 5 - ghost
// 9 - ghost lair
const grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 9, 9, 9, 9, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 5, 5, 5, 9, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 3, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 3, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

class Pacman {
  // The constructor is the method triggered with the `new` keyword
  constructor() {
    this.x = 13;
    this.y = 23;
  }

  eatDot() {
    score += 10;
  }

  moveLeft() {
    const futureX = this.x - 1;
    if (futureX < 0) {
      return;
    }
    if (!(grid[this.y][futureX] === 0) && !(grid[this.y][futureX] === 9)) {
      if (grid[this.y][futureX] === 5) {
        gameOver();
      }
      grid[this.y][this.x] = 2;
      this.x = futureX;
      if (grid[this.y][this.x] === 1) {
        this.eatDot();
      }
      grid[this.y][this.x] = 4;
    }
  }

  moveRight() {
    const futureX = this.x + 1;
    if (futureX >= 28) {
      return;
    }
    if (!(grid[this.y][futureX] === 0) && !(grid[this.y][futureX] === 9)) {
      if (grid[this.y][futureX] === 5) {
        gameOver();
      }
      grid[this.y][this.x] = 2;
      this.x = futureX;
      if (grid[this.y][this.x] === 1) {
        this.eatDot();
      }
      grid[this.y][this.x] = 4;
    }
  }

  moveUp() {
    const futureY = this.y - 1;
    if (futureY < 0) {
      return;
    }
    if (!(grid[futureY][this.x] === 0) && !(grid[futureY][this.x] === 9)) {
      if (grid[futureY][this.x] === 5) {
        gameOver();
      }
      grid[this.y][this.x] = 2;
      this.y = futureY;
      if (grid[this.y][this.x] === 1) {
        this.eatDot();
      }
      grid[this.y][this.x] = 4;
    }
  }

  moveDown() {
    const futureY = this.y + 1;
    if (futureY >= 31) {
      return;
    }
    if (!(grid[futureY][this.x] === 0) && !(grid[futureY][this.x] === 9)) {
      if (grid[futureY][this.x] === 5) {
        gameOver();
      }
      grid[this.y][this.x] = 2;
      this.y = futureY;
      if (grid[this.y][this.x] === 1) {
        this.eatDot();
      }
      grid[this.y][this.x] = 4;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x * squareSide + 10, this.y * squareSide + 10, 10, 0, Math.PI * 2);
    ctx.fillStyle = "gold";
    ctx.fill();
    ctx.closePath();
  }
}

const player = new Pacman();

class Ghost {
  constructor(ghostName, startX, startY, speed, color, contentOfSquare) {
    this.ghostName = ghostName;
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.isScared = false;
    this.timerId = NaN;
    this.color = color;
    this.contentOfSquare = contentOfSquare;
    this.directions = ["l", "r", "u", "d"];
    this.direction = "u";
  }

  moveLeft() {
    const futureX = this.x - 1;
    if (futureX < 0) {
      return;
    }
    if (!(grid[this.y][futureX] === 0) && !(grid[this.y][futureX] === 5)) {
      if (grid[this.y][futureX] === 4) {
        gameOver();
      }
      grid[this.y][this.x] = this.contentOfSquare;
      this.contentOfSquare = grid[this.y][futureX];
      this.x = futureX;
      grid[this.y][this.x] = 5;
    } else this.direction = this.directions[Math.floor(Math.random() * this.directions.length)];
  }

  moveRight() {
    const futureX = this.x + 1;
    if (futureX >= 28) {
      return;
    }
    if (!(grid[this.y][futureX] === 0) && !(grid[this.y][futureX] === 5)) {
      if (grid[this.y][futureX] === 4) {
        gameOver();
      }
      grid[this.y][this.x] = this.contentOfSquare;
      this.contentOfSquare = grid[this.y][futureX];
      this.x = futureX;
      grid[this.y][this.x] = 5;
    } else this.direction = this.directions[Math.floor(Math.random() * this.directions.length)];
  }

  moveUp() {
    const futureY = this.y - 1;
    if (futureY < 0) {
      return;
    }
    if (!(grid[futureY][this.x] === 0) && !(grid[futureY][this.x] === 5)) {
      if (grid[futureY][this.x] === 4) {
        gameOver();
      }
      grid[this.y][this.x] = this.contentOfSquare;
      this.contentOfSquare = grid[futureY][this.x];
      this.y = futureY;
      grid[this.y][this.x] = 5;
    } else this.direction = this.directions[Math.floor(Math.random() * this.directions.length)];
  }

  moveDown() {
    const futureY = this.y + 1;
    if (futureY >= 31) {
      return;
    }
    if (!(grid[futureY][this.x] === 0) && !(grid[futureY][this.x] === 5)) {
      if (grid[futureY][this.x] === 4) {
        gameOver();
      }
      grid[this.y][this.x] = this.contentOfSquare;
      this.contentOfSquare = grid[futureY][this.x];
      this.y = futureY;
      grid[this.y][this.x] = 5;
    } else this.direction = this.directions[Math.floor(Math.random() * this.directions.length)];
  }

  move() {
    // this.direction = this.directions[Math.floor(Math.random() * this.directions.length)];

    this.timerId = setInterval(() => {
      switch (this.direction) {
        case "l":
          this.moveLeft();
          break;

        case "u":
          this.moveUp();
          break;

        case "r":
          this.moveRight();
          break;

        case "d":
          this.moveDown();
          break;

        default:
          break;
      }

      // if the ghost is currently scared
      if (this.isScared) {
        // this.turnScared();
      }

      draw();

      // if the ghost is currently scared and pacman is on it

      // checkForGameOver()
    }, this.speed);
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * squareSide + 2, this.y * squareSide + 2, 16, 16);
  }
}

const ghosts = [
  new Ghost("blinky", 13, 11, 170, "red", 2),
  new Ghost("pinky", 13, 13, 180, "hotpink", 9),
  new Ghost("inky", 12, 13, 230, "cyan", 9),
  new Ghost("clyde", 14, 13, 300, "sandybrown", 9),
];

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawWall(x, y) {
  ctx.fillStyle = "#0F2849";
  ctx.fillRect(x * squareSide, y * squareSide, squareSide, squareSide);
}

function drawDot(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x * squareSide + 9, y * squareSide + 9, 3, 3);
}

function drawPwrUp(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x * squareSide + 5, y * squareSide + 5, 10, 10);
}

function draw() {
  let key;
  clear();
  // j=x, i=y
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      key = grid[i][j];
      switch (key) {
        case 0:
          drawWall(j, i);
          break;

        case 1:
          drawDot(j, i);
          break;

        case 3:
          drawPwrUp(j, i);
          break;

        case 4:
          player.draw();
          break;

        case 5:
          ghosts.forEach((ghost) => ghost.draw());
          break;

        default:
          break;
      }
      scoreDisplay.innerText = score;
    }
  }
  if (checkWin()) {
    victory();
  }
}

function checkWin() {
  let win = true;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        win = false;
        return win;
      }
    }
  }
  return win;
}

function restart() {
  document.location.reload(true);
}

function victory() {
  ghosts.forEach((ghost) => clearInterval(ghost.timerId));
  document.getElementById("win-score").innerText = `Your final score is ${score}`;
  clear();
  document.getElementById("game-board").style.display = "none";
  document.getElementById("win").style.display = "block";
  setTimeout(() => {
    restart();
  }, 3000);
}

function gameOver() {
  ghosts.forEach((ghost) => clearInterval(ghost.timerId));
  document.getElementById("gameover-score").innerText = `Your final score is ${score}`;
  clear();
  document.getElementById("game-board").style.display = "none";
  document.getElementById("game-over").style.display = "block";

  setTimeout(() => {
    restart();
  }, 3000);
}

function startGame() {
  draw();
  ghosts.forEach((ghost) => ghost.move());
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    // Esconder o titulo e o botao de Start Game
    document.getElementById("title").style.display = "none";

    // Exibir a game board
    document.getElementById("game-board").style.display = "block";

    // Iniciar o jogo
    startGame();
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 37: // left arrow
          player.moveLeft();
          draw();
          break;
        case 38: // up arrow
          player.moveUp();
          draw();
          break;
        case 39: // right arrow
          player.moveRight();
          draw();
          break;
        case 40: // right arrow
          player.moveDown();
          draw();
          break;
        default:
          break;
      }
    });
  };
};
