/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
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

// const eatingSound = new Audio("./sounds/eating.mp3");
// const eatingGhostSound = new Audio("./sounds/eating-ghost.mp3");
// const eatingPwrUpSound = new Audio("./sounds/eating-fruit.mp3");
// const deadSound = new Audio("./sounds/miss.mp3");
// const startSound = new Audio("./sounds/start-music.mp3");

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
    this.pacLeftImg = new Image();
    this.pacLeftImg.src = "./images/pac-left.png";
    this.pacRightImg = new Image();
    this.pacRightImg.src = "./images/pac-right.png";
    this.pacUpImg = new Image();
    this.pacUpImg.src = "./images/pac-up.png";
    this.pacDownImg = new Image();
    this.pacDownImg.src = "./images/pac-down.png";
    this.direction = "left";
  }

  eatDot() {
    // eatingSound.play();
    score += 10;
  }

  eatPwrUp() {
    // eatingPwrUpSound.play();
    score += 50;

    ghosts.forEach((ghost) => {
      ghost.isScared = true;
    });
    setTimeout(() => {
      ghosts.forEach((ghost) => {
        ghost.isScared = false;
      });
    }, 10000);
  }

  eatGhost(ghostId) {
    // eatingGhostSound.play();
    score += 200;
    ghosts[ghostId].isScared = false;
    grid[ghosts[ghostId].y][ghosts[ghostId].x] = ghosts[ghostId].contentOfSquare;
    ghosts[ghostId].contentOfSquare = 2;
    ghosts[ghostId].x = ghosts[ghostId].startX;
    ghosts[ghostId].y = ghosts[ghostId].startY;
    grid[ghosts[ghostId].y][ghosts[ghostId].x] = 5;
  }

  moveLeft() {
    this.direction = "left";
    if (this.y === 14 && this.x === 0) {
      this.x = 27;
      grid[14][0] = 2;
      grid[this.y][this.x] = 4;
      return;
    }
    const futureX = this.x - 1;
    if (futureX < 0) {
      return;
    }
    if (!(grid[this.y][futureX] === 0) && !(grid[this.y][futureX] === 9)) {
      if (grid[this.y][futureX] === 5) {
        const ghostId = ghosts.findIndex((ghost) => ghost.x === futureX && ghost.y === this.y);
        if (!ghosts[ghostId].isScared) {
          gameOver();
        } else {
          this.eatGhost(ghostId);
        }
      }
      grid[this.y][this.x] = 2;
      this.x = futureX;
      if (grid[this.y][this.x] === 1) {
        this.eatDot();
      }
      if (grid[this.y][this.x] === 3) {
        this.eatPwrUp();
      }
      grid[this.y][this.x] = 4;
    }
  }

  moveRight() {
    this.direction = "right";
    if (this.y === 14 && this.x === 27) {
      this.x = 0;
      grid[14][27] = 2;
      grid[this.y][this.x] = 4;
      return;
    }
    const futureX = this.x + 1;
    if (futureX >= 28) {
      return;
    }
    if (!(grid[this.y][futureX] === 0) && !(grid[this.y][futureX] === 9)) {
      if (grid[this.y][futureX] === 5) {
        const ghostId = ghosts.findIndex((ghost) => ghost.x === futureX && ghost.y === this.y);
        if (!ghosts[ghostId].isScared) {
          gameOver();
        } else {
          this.eatGhost(ghostId);
        }
      }
      grid[this.y][this.x] = 2;
      this.x = futureX;
      if (grid[this.y][this.x] === 1) {
        this.eatDot();
      }
      if (grid[this.y][this.x] === 3) {
        this.eatPwrUp();
      }
      grid[this.y][this.x] = 4;
    }
  }

  moveUp() {
    this.direction = "up";
    const futureY = this.y - 1;
    if (futureY < 0) {
      return;
    }
    if (!(grid[futureY][this.x] === 0) && !(grid[futureY][this.x] === 9)) {
      if (grid[futureY][this.x] === 5) {
        const ghostId = ghosts.findIndex((ghost) => ghost.x === this.x && ghost.y === futureY);
        if (!ghosts[ghostId].isScared) {
          gameOver();
        } else {
          this.eatGhost(ghostId);
        }
      }
      grid[this.y][this.x] = 2;
      this.y = futureY;
      if (grid[this.y][this.x] === 1) {
        this.eatDot();
      }
      if (grid[this.y][this.x] === 3) {
        this.eatPwrUp();
      }
      grid[this.y][this.x] = 4;
    }
  }

  moveDown() {
    this.direction = "down";
    const futureY = this.y + 1;
    if (futureY >= 31) {
      return;
    }
    if (!(grid[futureY][this.x] === 0) && !(grid[futureY][this.x] === 9)) {
      if (grid[futureY][this.x] === 5) {
        const ghostId = ghosts.findIndex((ghost) => ghost.x === this.x && ghost.y === futureY);
        if (!ghosts[ghostId].isScared) {
          gameOver();
        } else {
          this.eatGhost(ghostId);
        }
      }
      grid[this.y][this.x] = 2;
      this.y = futureY;
      if (grid[this.y][this.x] === 1) {
        this.eatDot();
      }
      if (grid[this.y][this.x] === 3) {
        this.eatPwrUp();
      }
      grid[this.y][this.x] = 4;
    }
  }

  draw() {
    if (this.direction === "left") {
      ctx.drawImage(this.pacLeftImg, this.x * squareSide, this.y * squareSide, 20, 20);
    } else if (this.direction === "right") {
      ctx.drawImage(this.pacRightImg, this.x * squareSide, this.y * squareSide, 20, 20);
    } else if (this.direction === "up") {
      ctx.drawImage(this.pacUpImg, this.x * squareSide, this.y * squareSide, 20, 20);
    } else if (this.direction === "down") {
      ctx.drawImage(this.pacDownImg, this.x * squareSide, this.y * squareSide, 20, 20);
    }
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
    if (this.y === 14 && this.x === 0) {
      this.x = 27;
      grid[14][0] = 2;
      grid[this.y][this.x] = 4;
      return;
    }
    const futureX = this.x - 1;
    if (futureX < 0) {
      return;
    }
    if (!(grid[this.y][futureX] === 0) && !(grid[this.y][futureX] === 5)) {
      if (grid[this.y][futureX] === 4) {
        if (!this.isScared) {
          gameOver();
        }
      }
      grid[this.y][this.x] = this.contentOfSquare;
      this.contentOfSquare = grid[this.y][futureX];
      this.x = futureX;
      grid[this.y][this.x] = 5;
    } else this.direction = this.directions[Math.floor(Math.random() * this.directions.length)];
  }

  moveRight() {
    if (this.y === 14 && this.x === 27) {
      this.x = 0;
      grid[14][27] = 2;
      grid[this.y][this.x] = 4;
      return;
    }
    const futureX = this.x + 1;
    if (futureX >= 28) {
      return;
    }
    if (!(grid[this.y][futureX] === 0) && !(grid[this.y][futureX] === 5)) {
      if (grid[this.y][futureX] === 4) {
        if (!this.isScared) {
          gameOver();
        }
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
        if (!this.isScared) {
          gameOver();
        }
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
        if (!this.isScared) {
          gameOver();
        }
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

      draw();
    }, this.speed);
  }

  draw(index) {
    if (this.isScared) {
      ctx.drawImage(scaredImg, this.x * squareSide, this.y * squareSide, 20, 20);
    } else {
      ctx.drawImage(ghostsImg[index], this.x * squareSide, this.y * squareSide, 20, 20);
    }
  }
}

const blinkyImg = new Image();
blinkyImg.src = "./images/blinky.png";
const pinkyImg = new Image();
pinkyImg.src = "./images/pinky.png";
const inkyImg = new Image();
inkyImg.src = "./images/inky.png";
const clydeImg = new Image();
clydeImg.src = "./images/clyde.png";
const scaredImg = new Image();
scaredImg.src = "./images/scared.png";

const ghostsImg = [blinkyImg, pinkyImg, inkyImg, clydeImg];

const ghosts = [
  new Ghost("blinky", 13, 11, 140, "red", 2),
  new Ghost("pinky", 13, 13, 160, "hotpink", 9),
  new Ghost("inky", 12, 13, 180, "cyan", 9),
  new Ghost("clyde", 14, 13, 200, "sandybrown", 9),
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
          ghosts.forEach((ghost, index) => ghost.draw(index));
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
  // deadSound.play();
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
  // startSound.play();
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
