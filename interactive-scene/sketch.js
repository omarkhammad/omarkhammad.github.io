// Interactive Scene
// Demo

let playerX;
let playerY;
let playerSize = 20;
let maxSpeed = 15;
let minSpeed = 0.5;
let dx = 0;
let dy = 0;
let acc = 2;
let decc = 0.9;
let dashCooldown = 90;
let dashTimer = 0;
let dashMultiplier = 5;
let dash = 1;
let dashLength = 6;



function setup() {
  createCanvas(windowWidth, windowHeight);
  playerX = width / 2;
  playerY = height / 2;
  fill("green")
}

function draw() {
  background("white");
  if (dashTimer > 0) {
    dashTimer--;
  } else if (dashTimer === -1) {
    dash = 1;
    dashTimer = dashCooldown;
  } else if (dashTimer < -1) {
    dashTimer++;
  }

  if (mouseIsPressed && dashTimer === 0) {
    dash = dashMultiplier;
    dashTimer = -dashLength;
  }

  if (keyIsDown(87)) { //W
    if (dy > -maxSpeed){
      dy -= acc;
    } else{
      dy = -maxSpeed;
    }
  } else if (keyIsDown(83)) { //S
    if (dy < maxSpeed){
      dy += acc;
    } else{
      dy = maxSpeed;
    }
  } else if (Math.abs(dy) > minSpeed){
    dy = dy * decc;
  } else{
    dy = 0
  }
  
  
  if (keyIsDown(65)) { //A
    if (dx > -maxSpeed){
      dx -= acc;
    } else{
      dx = -maxSpeed;
    }
  } else if (keyIsDown(68)) { //D
    if (dx < maxSpeed){
      dx += acc;
    } else{
      dx = maxSpeed;
    }
  } else if (Math.abs(dx) > minSpeed){
    dx = dx * decc;
  } else{
    dx = 0
  }


  playerX += dx * dash;
  playerY += dy * dash;

  if (playerX < playerSize) {
    playerX = playerSize;
  } else if (playerX > width - playerSize) {
    playerX = width - playerSize;
  }
  if (playerY < playerSize) {
    playerY = playerSize;
  } else if (playerY > height - playerSize) {
    playerY = height - playerSize;
  }
  

  circle(playerX, playerY, playerSize * 2);
}