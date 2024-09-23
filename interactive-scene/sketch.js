// Interactive Scene
// Demo

let playerX;
let playerY;
let playerSize = 20;
let maxSpeed = 12;
let minSpeed = 0.75;
let dx = 0;
let dy = 0;
let acc = 2;
let decc = 0.9;

let dashCooldown = 60;
let dashTimer = 0;
let dashMultiplier = 3;
let dash = 1;
let dashLength = 8;

let barHeight = 60;
let barPadding = 10;
let barWidthScale = 3;

let rows;
let lazerColor;
let lazerOpacity = 128;
let rowHeight = 5;


function playerDash(){
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
}


function playerMove(){
  if (keyIsDown(87)) { //W
    if (dy > -maxSpeed) {
      dy -= acc;
    } else {
      dy = -maxSpeed;
    }
  } else if (keyIsDown(83)) { //S
    if (dy < maxSpeed) {
      dy += acc;
    } else {
      dy = maxSpeed;
    }
  } else if (Math.abs(dy) > minSpeed) {
    dy = dy * decc;
  } else {
    dy = 0
  }

  if (keyIsDown(65)) { //A
    if (dx > -maxSpeed) {
      dx -= acc;
    } else {
      dx = -maxSpeed;
    }
  } else if (keyIsDown(68)) { //D
    if (dx < maxSpeed) {
      dx += acc;
    } else {
      dx = maxSpeed;
    }
  } else if (Math.abs(dx) > minSpeed) {
    dx = dx * decc;
  } else {
    dx = 0
  }

  playerX += dx * dash;
  playerY += dy * dash;

  if (playerX < playerSize) {
    playerX = playerSize;
  } else if (playerX > width - playerSize) {
    playerX = width - playerSize;
  }
  if (playerY < playerSize + barHeight) {
    playerY = playerSize + barHeight;
  } else if (playerY > height - playerSize) {
    playerY = height - playerSize;
  }
}


function lazers(){
  lazerColor.setAlpha(lazerOpacity);
  fill(lazerColor);
  rows = 5;
  for (let i = 0; i < rows; i++){
    rect(0, playerSize + barHeight + i * (height - barHeight) / rows, width, rowHeight + playerSize + barHeight + i * (height - barHeight) / rows);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  playerX = width / 2;
  playerY = height / 2;

  lazerColor = color(255, 128, 128);
}


function draw() {
  background("black");
  fill("white")
  rect(0, barHeight, width, height - barHeight, playerSize)

  lazers();

  fill("black")
  rect(0, 0, width, barHeight)
  fill("grey")
  rect(barPadding, barPadding, dashCooldown * barWidthScale, barHeight - barPadding * 2)
  fill("lime")
  rect(barPadding, barPadding, (dashCooldown - dashTimer) * barWidthScale * (dashTimer >= 0), barHeight - barPadding * 2)
  

  playerDash();

  playerMove();

  fill("green")
  circle(playerX, playerY, playerSize * 2,);
}