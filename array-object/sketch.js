// Headbud


let player = {
  curve: 5,
  size: 40,
  x:0,
  y:0,
  acceleration: 2.5,
  dx: 0,
  dy: 0,
  jumpSpeed: 14,
  bumpSpeed: 14,
  gravity: 0.5,
  maxSpeed: 9,
  minSpeed: 1,
  deceleration: 0.85,
  startingHealth: 5,
  health: 5,
  heal: 0.2,
  strokeSize: 5,
  strokeColor: "black",
  fillGradient: [],
  didBump: false,
  maxBumpSpeed: 7
};

let floorHeight = 100;

let theTargets = [];
let targetSize = 15;
let targetSpeed = 7;
let targetColor = "red";
let targetSpawnDistance = targetSize;
let toMerge = [];

let cameraMoveThreshold;

let c1, c2, c3, c4;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  textStyle(BOLDITALIC);
  textAlign(CENTER, CENTER);

  window.setInterval(spawnTarget, 500);

  player.x = (width - player.size) / 2;
  player.y = height - player.size;

  cameraMoveThreshold = height / 7 * 4;

  c1 = color(33, 130, 255);
  c2 = color(225);
  c3 = color("darkBlue");
  c4 = color(0);
}

function draw() {
  if (gameIsOver()) {
    gameOver();
  }
  else{
    moveCamera();
  
    backgroundGradient();
  
    playerMove();
  
    playerJump();
  
    calculatePlayerMovement();
  
    moveTargets();
  
    checkTargetTouchingTarget();
  
    checkTargetTouchingPlayer();
  
    drawTargets();
  
    drawPlayer();
  
    drawFloor();
  }
}


function gameOver() {
  textSize(200);

  fill(0);
  text("Game Over", width / 2, height / 2);

  fill("black");
  textSize(40);
  text("press F5 to restart", width / 2, height * 3 / 4);
}


function gameIsOver() {
  return player.health <= 0;
}


function backgroundGradient() {
  background(c4);

  for(let y = (player.y < cameraMoveThreshold) * (player.y  - cameraMoveThreshold); y < (player.y < cameraMoveThreshold) * (player.y  - cameraMoveThreshold) + height; y++){
    let newc = paletteLerp([[c4, -(height*2)], [c3, -height], [c2, 0], [c1, height]], y);
    stroke(newc);
    line(0,y,width, y);
  }
}


function moveCamera() {
  if (player.y < cameraMoveThreshold) {
    translate(0, cameraMoveThreshold - player.y);
  }
  else {
    translate(0, 0);
  }
}


function checkTargetTouchingPlayer() {
  for (let target of theTargets) {
    let targetIndex = theTargets.indexOf(target);
    if (onTarget(target)) {
      theTargets.splice(targetIndex, 1);
      if (player.didBump < target.multiplier){
        player.didBump = target.multiplier;
      }
    }
    else if (targetTouchingPlayer(target)) {
      player.health -= target.multiplier;
      theTargets.splice(targetIndex, 1);
    }
  }
  playerBump();
}


function playerBump() {
  if (player.didBump) {
    player.dy = player.bumpSpeed * player.didBump ** 0.33;

    player.health += player.didBump * player.heal;
    if (player.health > player.startingHealth) {
      player.health = player.startingHealth;
    }

    player.didBump = false;
  }
}


function onTarget(target) {
  return targetTouchingPlayer(target) && player.dy < player.maxBumpSpeed && player.y + player.size / 2 < target.y;
}


function targetTouchingPlayer(target) {
  return dist(target.x, target.y, player.x + player.size / 2, player.y + player.size / 2) < player.size / 2 + target.radius;
}


function moveTargets() {
  for (let target of theTargets) {
    let angle = atan2(player.y - target.y + player.size / 2, player.x - target.x + player.size / 2);
    target.y += sin(angle) * targetSpeed;
    target.x += cos(angle) * targetSpeed;
  }
}


function checkTargetTouchingTarget() {
  toMerge = [];
  for (let targetIndex = 0; targetIndex < theTargets.length; targetIndex++) {
    let target = theTargets[targetIndex];
    for (let otherTargetIndex = targetIndex + 1; otherTargetIndex < theTargets.length; otherTargetIndex++) {
      let otherTarget = theTargets[otherTargetIndex];
      if (dist(target.x, target.y, otherTarget.x, otherTarget.y) < target.radius + otherTarget.radius) {
        toMerge.push([target, otherTarget]);
      }
    }
  }
  for (let targetsToMerge of toMerge) {
    mergeTargets(targetsToMerge[0], targetsToMerge[1]);
  }
}


function mergeTargets(target1, target2) {
  let someTarget = {
    x: (target1.x + target2.x) / 2,
    y: (target1.y + target2.y) / 2,
    speed: (target1.speed + target2.speed) / 2,
    radius: (target1.radius**2 + target2.radius**2)**0.5,
    color: targetColor,
    multiplier: target1.multiplier + target2.multiplier
  };
  theTargets.push(someTarget);

  theTargets.splice(theTargets.indexOf(target1), 1);
  theTargets.splice(theTargets.indexOf(target2), 1);
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
    y: (player.y < cameraMoveThreshold) * (player.y  - cameraMoveThreshold),
    speed: targetSpeed,
    radius: targetSize,
    color: targetColor,
    multiplier: 1
  };
  theTargets.push(someTarget);
}


function drawFloor() {
  noStroke();
  fill(0, 85, 0);
  rect(0, height - floorHeight, width, floorHeight);
}


function calculatePlayerMovement() {
  if (player.x + player.dx <= 0) {
    player.x = 0;
    player.dx *= 0.5;
  }
  else if (player.x + player.dx >= width - player.size) {
    player.x = width - player.size;
    player.dx *= 0.5;
  }
  else {
    player.x += player.dx;
  }


  if (player.y > height - player.size - floorHeight) {
    player.y = height - player.size - floorHeight;
  }
  else {
    player.y -= player.dy;
  }
}


function drawPlayer() {
  stroke(player.strokeColor);
  strokeWeight(player.strokeSize);

  fill(paletteLerp([
    ["red", 0],
    ["yellow", player.startingHealth / 2],
    ["green", player.startingHealth]
  ], player.health));

  square(player.x + player.strokeSize / 2, player.y + player.strokeSize / 2, player.size - player.strokeSize, player.curve);
}


function playerJump() {
  if (player.y === height - player.size - floorHeight && keyIsDown(32)) {
    player.dy = player.jumpSpeed;
  }
  else if (player.y < height - player.size - floorHeight) {
    player.dy -= player.gravity;
  }
  else {
    player.dy = 0;
  }
}


function playerMove() {
  if (keyIsDown(65)) { //A
    // Moves the player left
    player.dx -= player.acceleration;
    if (player.dx < -player.maxSpeed) {
      player.dx = -player.maxSpeed;
    }
  }
  else if (keyIsDown(68)) { //D
    // Moves the player right
    player.dx += player.acceleration;
    if (player.dx > player.maxSpeed) {
      player.dx = player.maxSpeed;
    }
  }
  else if (Math.abs(player.dx) > player.minSpeed) {
    // Decelerates the player horizontally
    player.dx = player.dx * player.deceleration;
  }
  else {
    // Stops the player horizontally
    player.dx = 0;
  }
}


function windowResized() {
  // Resizes the game if the window size changes
  resizeCanvas(windowWidth, windowHeight);
}

