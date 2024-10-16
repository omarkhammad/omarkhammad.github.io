// Headbud

let playerCurve = 5;
let playerSize = 40;
let playerX;
let playerY;
let PlayerAcceleration = 2.5;
let playerDX = 0;
let playerDY = 0;
let playerJumpSpeed = 14;
let playerBumpSpeed = 14;
let gravity = 0.5;
let playerMaxSpeed = 9;
let PlayerMinSpeed = 1;
let playerDelecration = 0.85;
let playerHealth = 5;

let floorHeight = 50;

let theTargets = [];
let targetSize = 20;
let targetSpeed = 7;
let targetColor = "red";

function setup() {
  createCanvas(windowWidth, windowHeight);

  window.setInterval(spawnTarget, 900);

  playerX = (width - playerSize) / 2;
  playerY = height - playerSize;
}

function draw() {
  translate(0, height - playerY - floorHeight- 200);

  background("lightBlue");

  playerMove();

  playerJump();

  calculatePlayerMovement();

  moveTargets();

  checkTargetTouching();

  drawTargets();

  drawPlayer();

  drawFloor();
}


function checkTargetTouching() {
  for (let target of theTargets) {
    let targetIndex = theTargets.indexOf(target);
    if (onTarget(target)) {
      theTargets.splice(targetIndex, 1);
      playerBump();
    }
    else if (touchingTarget(target)) {
      playerHealth--;
      theTargets.splice(targetIndex, 1);
    }
  }
}


function playerBump() {
  playerDY = playerBumpSpeed;
}


function onTarget(target) {
  return touchingTarget(target) && playerDY < 5 && playerY + playerSize / 2 < target.y;
}


function touchingTarget(target) {
  return dist(target.x, target.y, playerX + playerSize / 2, playerY + playerSize / 2) < playerSize / 2 + target.radius;
}


function moveTargets() {
  for (let target of theTargets) {
    let angle = atan2(playerY - target.y + playerSize / 2, playerX - target.x + playerSize / 2);
    target.y += sin(angle) * targetSpeed;
    target.x += cos(angle) * targetSpeed;
  }
}


function drawTargets() {
  stroke("black");
  strokeWeight(2);
  for (let target of theTargets) {
    fill(target.color);
    circle(target.x, target.y, target.radius * 2);
  }
}


function spawnTarget() {
  let someTarget = {
    x: random(0, width),
    y: 0,
    speed: targetSpeed,
    radius: targetSize,
    color: targetColor,
  };
  theTargets.push(someTarget);
}


function drawFloor() {
  noStroke();
  fill("green");
  rect(0, height - floorHeight, width, floorHeight);
}


function calculatePlayerMovement() {
  if (playerX + playerDX <= 0) {
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
  noStroke();
  fill("black");
  square(playerX, playerY, playerSize, playerCurve);
}


function playerJump() {
  if (playerY === height - playerSize - floorHeight && keyIsDown(32)) {
    playerDY = playerJumpSpeed;
  }
  else if (playerY < height - playerSize - floorHeight) {
    playerDY -= gravity;
  }
  else {
    playerDY = 0;
  }
}


function playerMove() {
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

