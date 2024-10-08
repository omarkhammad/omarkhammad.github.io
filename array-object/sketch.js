// Headbud

let playerCurve = 5;
let playerSize = 40;
let playerX;
let playerY;
let PlayerAcceleration = 1.5;
let playerDX = 0;
let playerDY = 0;
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

  playerX += playerDX;

  fill("black");
  square(playerX, playerY, playerSize, playerCurve);
}


function playerJump(){
  
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
