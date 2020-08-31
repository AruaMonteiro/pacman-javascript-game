/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-useless-return */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const squareSide = 20;

// 0 - wall
// 1 - pacdot
// 2 - empty
// 3 - powerup
// 4 - pacman
// 5 - blinky
// 6 - pinky
// 7 - inky
// 8 - clyde
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
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 9, 9, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 9, 7, 6, 8, 9, 9, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 0, 9, 9, 9, 9, 9, 9, 0, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 9, 9, 9, 9, 9, 9, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
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

  moveLeft() {
    const futureX = this.x - 1;
    if (futureX < 0) {
      return;
    }
    if (!(grid[this.y][futureX] === 0) && !(grid[this.y][futureX] === 9)) {
      grid[this.y][this.x] = 2;
      this.x = futureX;
      grid[this.y][this.x] = 4;
    }
  }

  moveRight() {
    const futureX = this.x + 1;
    if (futureX >= 28) {
      return;
    }
    if (!(grid[this.y][futureX] === 0) && !(grid[this.y][futureX] === 9)) {
      grid[this.y][this.x] = 2;
      this.x = futureX;
      grid[this.y][this.x] = 4;
    }
  }

  moveUp() {
    const futureY = this.y - 1;
    if (futureY < 0) {
      return;
    }
    if (!(grid[futureY][this.x] === 0) && !(grid[futureY][this.x] === 9)) {
      grid[this.y][this.x] = 2;
      this.y = futureY;
      grid[this.y][this.x] = 4;
    }
  }

  moveDown() {
    const futureY = this.y + 1;
    if (futureY >= 31) {
      return;
    }
    if (!(grid[futureY][this.x] === 0) && !(grid[futureY][this.x] === 9)) {
      grid[this.y][this.x] = 2;
      this.y = futureY;
      grid[this.y][this.x] = 4;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x * squareSide + 10, this.y * squareSide + 10, 10, 0, Math.PI * 2);
    ctx.fillStyle = "yellow"; // !
    ctx.fill();
    ctx.closePath();
  }
}

const player = new Pacman();

class Ghost {
  constructor(className, startX, startY, speed, color) {
    this.className = className;
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.isScared = false;
    this.timerId = NaN;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * squareSide + 2, this.y * squareSide + 2, 16, 16);
  }
}

ghosts = [
  new Ghost("blinky", 13, 11, 250, "red"),
  new Ghost("pinky", 13, 13, 400, "hotpink"),
  new Ghost("inky", 12, 13, 300, "cyan"),
  new Ghost("clyde", 14, 13, 500, "sandybrown"),
];

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawWall(x, y) {
  ctx.fillStyle = "blue";
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
          ghosts[0].draw();
          break;

        case 6:
          ghosts[1].draw();
          break;

        case 7:
          ghosts[2].draw();
          break;

        case 8:
          ghosts[3].draw();
          break;
        default:
          break;
      }
    }
  }
}

window.onload = () => {
  draw();

  document.addEventListener("keyup", (e) => {
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
