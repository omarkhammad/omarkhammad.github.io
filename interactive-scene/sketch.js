// Interactive Scene
// Demo

let playerX;
let playerY;
let playerSize = 20;
let maxSpeed = 8;
let minSpeed = 0.75;
let dx = 0;
let dy = 0;
let acc = 2;
let decc = 0.8;

let dashCooldown = 60;
let dashTimer = 0;
let dashMultiplier = 3;
let dash = 1;
let dashLength = 8;

let barHeight = 60;
let barPadding = 10;
let barWidthScale = 3;

let rows;
let columns;
let minRows = 3;
let maxRows = 10;
let minColumns = 3;
let maxColumns = 10;
let lazerSize = 50;
let lazerColor;
let lowLazerOpacity = 128;
let highLazerOpacity = 255;
let lazerCooldownTime = 70;
let lazerTimer = lazerCooldownTime;
let lazerMode = 0;
let lazerWarningTime = 80;
let lazerOnTime = 120;



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
    dy -= acc;
    if (dy < -maxSpeed) {
      dy = -maxSpeed;
    }
  } else if (keyIsDown(83)) { //S
    dy += acc;
    if (dy > maxSpeed) {
      dy = maxSpeed;
    }
  } else if (Math.abs(dy) > minSpeed) {
    dy = dy * decc;
  } else {
    dy = 0
  }

  if (keyIsDown(65)) { //A
    dx -= acc;
    if (dx < -maxSpeed) {
      dx = -maxSpeed;
    }
  } else if (keyIsDown(68)) { //D
    dx += acc;
    if (dx > maxSpeed) {
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
  lazerTimer--;
  if (!lazerTimer){
    rows = random(minRows, maxRows)
    columns = random(minColumns, maxColumns)
    lazerMode = 1;
    lazerColor.setAlpha(lowLazerOpacity);

  } else if (lazerTimer < -lazerOnTime){
    lazerTimer = lazerCooldownTime
    lazerMode = 0;

  } else if (lazerTimer < -lazerWarningTime){
    lazerColor.setAlpha(highLazerOpacity);
    lazerMode = 2;
}

  
  if (lazerMode){
    fill(lazerColor);
    for (let row = 0; row < rows; row++){
      rect(0, playerSize + barHeight + row * (height - barHeight - playerSize * 2) / rows, width, lazerSize);
    }

    for (let column = 0; column < columns; column++){
      rect(playerSize + column * (width - playerSize * 2) / columns, barHeight, lazerSize, width - barHeight);
    }
  }
}


function topBar(){
  fill("black")
  rect(0, 0, width, barHeight)
  fill("grey")
  rect(barPadding, barPadding, dashCooldown * barWidthScale, barHeight - barPadding * 2)
  fill("lime")
  rect(barPadding, barPadding, (dashCooldown - dashTimer) * barWidthScale * (dashTimer >= 0), barHeight - barPadding * 2)
}


function drawCircle(){
  fill("green")
  circle(playerX, playerY, playerSize * 2,);
}


function drawBackground(){
  background("black");
  fill("white")
  rect(0, barHeight, width, height - barHeight, playerSize)
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  playerX = width / 2;
  playerY = height / 2;

  lazerColor = color(230, 0, 0);
}


function draw() {
  drawBackground();

  topBar();

  playerDash();

  playerMove();

  drawCircle();

  lazers();
}