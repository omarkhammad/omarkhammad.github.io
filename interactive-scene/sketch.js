// Interactive Scene
// Demo

let playerX;
let playerY;
let playerSize = 30;
let speed = 15;
let dx = 0;
let dy = 0;
let acc = 2;
let decc = 0.75;
let dashCooldown = 120;
let dashTimer = 0;
let dashMultiplier = 4;
let dash = 1;
let dashLength = 8;



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

  if (keyIsDown(32) && dashTimer === 0) {
    dash = dashMultiplier;
    dashTimer = -dashLength;
  }

  if (keyIsDown(87)) { //W
    if (dy > -speed){
      dy -= acc;
    } else{
      dy = -speed;
    }
  } else if (keyIsDown(83)) { //S
    if (dy < speed){
      dy += acc;
    } else{
      dy = speed;
    }
  } else{
    dy = dy * decc;
  }
  
  
  if (keyIsDown(65)) { //A
    if (dx > -speed){
      dx -= acc;
    } else{
      dx = -speed;
    }
  } else if (keyIsDown(68)) { //D
    if (dx < speed){
      dx += acc;
    } else{
      dx = speed;
    }
  } else{
    dx = dx * decc;
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