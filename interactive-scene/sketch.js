// Interactive Scene
// Demo

let playerX;
let playerY;
let playerSize = 50;
let speed;
let dashCooldown = 240;
let dashSpeed = 20;
let dashLength = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerX = width / 2;
  playerY = height / 2;
  fill("black")
}

function draw() {
  background(220);
  if (dashCooldown > 0) {
    dashCooldown--;
    speed = 10;
  } else if (dashCooldown < 0) {
    if (dashCooldown < -1) {
      dashCooldown = 240;
    } else {
      dashCooldown++;
    }
  }

  if (keyIsDown(32) && dashCooldown === 0); {
    speed = dashSpeed;
    dashCooldown = -dashLength;
  }


  if (keyIsDown(87)) { //W
    playerY -= speed;
  } else if (keyIsDown(83)) { //S
    playerY += speed;
  }
  if (keyIsDown(65)) { //A
    playerX -= speed;
  } else if (keyIsDown(68)) { //D
    playerX += speed;
  }

  circle(playerX, playerY, playerSize);
}