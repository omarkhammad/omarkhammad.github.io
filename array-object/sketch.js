// Headbud

let playerCurve = 5;
let playerSize = 40;
let playerX;
let playerY;
let PlayerAcceleration = 1.5;
let playerDX = 0;
let playerDY = 0;
let playerJumpSpeed = 14;
let gravity = 0.5;
let playerMaxSpeed = 13;
let PlayerMinSpeed = 1;
let playerDelecration = 0.85;

let floorHeight = 50;

let theTargets = [];
let targetSize = 20;
let targetSpeed = 15;
let targetColor = "red";

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  window.setInterval(spawnTarget, 2000);

  playerX = (width - playerSize) / 2;
  playerY = height - playerSize;
}

function draw() {
  background("lightBlue");

  playerMove();

  playerJump();

  calculatePlayerMovement();

  moveTargets();

  drawTargets();

  drawPlayer();

  drawFloor();
}


function moveTargets(){
  for (let target of theTargets){
    let angle = atan2(playerY - target.y + playerSize / 2, playerX - target.x + playerSize / 2);
    target.y += sin(angle) * targetSpeed;
    target.x += cos(angle) * targetSpeed;
  }
}


function drawTargets(){
  for (let target of theTargets) {
    fill(target.color);
    circle(target.x, target.y, target.radius * 2);
  }
}


function spawnTarget(){
  let someTarget = {
    x: random(0, width),
    y: random(0, height),
    speed: targetSpeed,
    radius: targetSize,
    color: targetColor,
  };
  theTargets.push(someTarget);
}


function drawFloor() {
  fill("green");
  rect(0, height - floorHeight, width, floorHeight);
}


function calculatePlayerMovement() {
  if (playerX + playerDX <= 0 ) {
    playerX = 0;
    playerDX *= 0.5;
  }
  else if (playerX + playerDX >= width - playerSize) {
    playerX = width - playerSize;
    playerDX *= 0.5;
  }
  else {
    playerX += playerDX;
  }
  

  if (playerY > height - playerSize - floorHeight) {
    playerY = height - playerSize - floorHeight;
  }
  else {
    playerY -= playerDY;
  }
}


function drawPlayer() {
  fill("black");
  square(playerX, playerY, playerSize, playerCurve);
}


function playerJump(){
  if (playerY === height - playerSize - floorHeight && keyIsDown(32)){
    playerDY = playerJumpSpeed;
  }
  else if (playerY < height - playerSize - floorHeight) {
    playerDY -= gravity;
  }
  else {
    playerDY = 0;
  }
}


function playerMove(){
  if (keyIsDown(65)) { //A
    // Moves the player left
    playerDX -= PlayerAcceleration;
    if (playerDX < -playerMaxSpeed) {
      playerDX = -playerMaxSpeed;
    }
  } 
  else if (keyIsDown(68)) { //D
    // Moves the player right
    playerDX += PlayerAcceleration;
    if (playerDX > playerMaxSpeed) {
      playerDX = playerMaxSpeed;
    }
  }
  else if (Math.abs(playerDX) > PlayerMinSpeed) {
    // Decelerates the player horizontally
    playerDX = playerDX * playerDelecration;
  }
  else {
    // Stops the player horizontally
    playerDX = 0;
  }
}


function windowResized() {
  // Resizes the game if the window size changes
  resizeCanvas(windowWidth, windowHeight);
}

