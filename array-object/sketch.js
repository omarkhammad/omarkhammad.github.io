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

function setup() {
  createCanvas(windowWidth, windowHeight);

  playerX = (width - playerSize) / 2;
  playerY = height - playerSize;
}

function draw() {
  background(256);

  playerMove();
  playerJump();

  playerX += playerDX;
  playerY -= playerDY;

  fill("black");
  square(playerX, playerY, playerSize, playerCurve);
}


function drawPlayer() {
  
}


function playerJump(){
  if (playerY === height - playerSize && keyIsDown(32)){
    playerDY = playerJumpSpeed;
  }
  else if (playerY < height - playerSize) {
    playerDY -= gravity;
  }
  else {
    playerDY = 0;
    playerY = height - playerSize;
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

