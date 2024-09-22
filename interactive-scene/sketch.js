// Interactive Scene
// Demo

let playerX;
let playerY;
let playerSize = 50;
let defultSpeed = 10;
let speed = defultSpeed;
let dashCooldown = 240;
let dashTimer = dashCooldown;
let dashSpeed = 30;
let dashLength = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerX = width / 2;
  playerY = height / 2;
  fill("red")
}

function draw() {
  background(256);
  if (dashTimer > 0) {
    dashTimer--;
  } else if (dashTimer === -1) {
    speed = defultSpeed;
    dashTimer = dashCooldown;
  } else if (dashTimer < -1) {
    dashTimer++;
  }
  
  if (keyIsDown(32) && dashTimer === 0) {
    speed = dashSpeed;
    dashTimer = -dashLength;
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