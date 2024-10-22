// Bump Or Die


let player = {
  curve: 5,
  size: 40,
  x: 0,
  y: 0,
  acceleration: 2.5,
  dx: 0,
  dy: 0,
  jumpSpeed: 14,
  bumpSpeed: 14,
  gravity: 0.5,
  maxSpeed: 9,
  minSpeed: 1,
  deceleration: 0.86,
  startingHealth: 5,
  health: 5,
  heal: 0.2,
  strokeSize: 5,
  strokeColor: "black",
  fillGradient: [],
  didBump: false,
  maxBumpSpeed: 7
};

let theTargets = [];
let toMerge = [];
let targetSize = 15;

let floorHeight = 100;

let cameraMoveThreshold;

let heightReached = 0;
let scoreDivide = 10;

let stars = [];
let starSize = 3;
let starColor = 255;
let numberOfStars = 100;
let starYLimit = 20;

let backgroundColor1, backgroundColor2, backgroundColor3, backgroundColor4;


function setup() {
  // Makes game take up the whole screen
  createCanvas(windowWidth, windowHeight);
  // Sets the targets' spawn rate
  window.setInterval(spawnTarget, 400);
  // Sets player's coridnates
  player.x = (width - player.size) / 2;
  player.y = height - player.size;
  // Sets camera's movment threshold
  cameraMoveThreshold = height / 7 * 4;
  // Sets the background's base colors for gradient
  backgroundColor1 = color(33, 130, 255);
  backgroundColor2 = color(225);
  backgroundColor3 = color("darkBlue");
  backgroundColor4 = color(0);
  // Creates star cordinates
  for (let i = 0; i < numberOfStars; i++) {
    stars.push([random(width), random(-height * 2, - height * starYLimit)]);
  }
}


function draw() {
  if (gameIsOver()) { // Checks if the game is over
    gameOver(); // Displays Game over
  }
  else {
    // Moves the camera deppending on player's height
    moveCamera();

    // Creates the sky & space background gradient
    backgroundGradient();

    // Checks if A or D were pressed
    playerMove();

    // Checks if space was pressed
    playerJump();

    // Displays the height reached
    displayHeightReached();

    // Displays the stars in the sky
    displayStars();

    // Calculates the player's movment
    calculatePlayerMovement();

    // Moves the targets
    moveTargets();

    // Checks if any 2 targets are touching eachother
    checkTargetTouchingTarget();

    // Checks if any target is touching the player
    checkTargetTouchingPlayer();

    // Displays all targets
    drawTargets();

    // Displays the player
    drawPlayer();

    // Displays the floor
    drawFloor();

    // Displays the bottom text
    bottomText();
  }
}


function displayStars() {
  // Displays the stars
  noStroke;
  fill(starColor);

  for (let i = 0; i < numberOfStars; i++) {
    // Only draws the stars that appear in the screen
    if (stars[i][1] > (player.y < cameraMoveThreshold) * (player.y - cameraMoveThreshold) && stars[i][1] < (player.y < cameraMoveThreshold) * (player.y - cameraMoveThreshold) + height) {
      circle(stars[i][0], stars[i][1], starSize);
    }
  }
}


function displayHeightReached() {
  // Displays the height reached
  if (heightReached < (height - floorHeight - player.size - player.y) / scoreDivide) {
    heightReached = Math.round((height - floorHeight - player.size - player.y) / scoreDivide);
  }
  // Creates an outline that contrasts with the background
  let c = get(0, 0);
  let cInverted = [255 - c[0], 255 - c[1], 255 - c[2]];
  stroke(cInverted);

  fill("orange");
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  textSize(30);
  text(`Height Reached: ${heightReached}`, 10, (player.y < cameraMoveThreshold) * (player.y - cameraMoveThreshold) + 10);
}


function bottomText() {
  fill("orange");
  // Displays bottom title
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(60);
  text("Jump or Die", width / 2, height - floorHeight / 2);
  // Displays controls
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  textSize(30);
  text("Controlls: A,  D,  Space", 10, height - floorHeight + 10);
  // Displays objectives
  textStyle(BOLD);
  textAlign(RIGHT, TOP);
  textSize(30);
  text("Jump on the targets", width - 10, height - floorHeight + 10);
}


function gameOver() {
  // Displays Game Over text
  textAlign(CENTER, CENTER);
  textStyle(BOLDITALIC);
  // Creates an outline that contrasts with the background
  let c = get(0, 0);
  let cInverted = [255 - c[0], 255 - c[1], 255 - c[2]];
  stroke(cInverted);

  strokeWeight(5);
  textSize(160);
  fill("orange");
  text("Game Over", width / 2, height / 2);
  // Displays restart instructions
  textSize(30);
  strokeWeight(2.5);
  text("press F5 to restart", width / 2, height * 3 / 4);
}


function gameIsOver() {
  // Checks if the game is over
  return player.health <= 0;
}


function backgroundGradient() {
  // Creates background sky gradient
  background(backgroundColor4);
  // Only draws the background that shows up on the screen
  for (let y = (player.y < cameraMoveThreshold) * (player.y - cameraMoveThreshold); y < (player.y < cameraMoveThreshold) * (player.y - cameraMoveThreshold) + height; y++) {
    // Draws horizontal lines with colors varying on the y axis
    let newColor = paletteLerp([[backgroundColor4, -(height * 2)], [backgroundColor3, -height], [backgroundColor2, 0], [backgroundColor1, height]], y);
    stroke(newColor);
    line(0, y, width, y);
  }
}


function moveCamera() {
  // Moves the camera vertically deppending on the player's Y codrinate
  if (player.y < cameraMoveThreshold) {
    translate(0, cameraMoveThreshold - player.y);
  }
  else {
    translate(0, 0);
  }
}


function checkTargetTouchingPlayer() {
  // Checks if the player is touching any targets
  for (let target of theTargets) {
    // Gets the target's index
    let targetIndex = theTargets.indexOf(target);
    // Checks if the player is on top of the target
    if (onTarget(target)) {
      // Deletes the target
      theTargets.splice(targetIndex, 1);
      if (player.didBump < target.multiplier) {
        player.didBump = target.multiplier;
      }
    }
    else if (targetTouchingPlayer(target)) {
      // Decreases the player's health
      player.health -= target.multiplier;
      // Deletes the target
      theTargets.splice(targetIndex, 1);
    }
  }
  // Makes the player bump up of it was on top of a target
  playerBump();
}


function playerBump() {
  // Makes the player bump up of it was on top of a target
  if (player.didBump) { // Checks if the player was on top of a target
    // Calculates the player's change in speed vertically
    player.dy = player.bumpSpeed * player.didBump ** 0.33;
    // Adds to the player's health
    player.health += player.didBump * player.heal;
    // Makes sure the player's health doesn't Go over the maximum
    if (player.health > player.startingHealth) {
      player.health = player.startingHealth;
    }

    player.didBump = false;
  }
}


function onTarget(target) {
  // Checks if the player is on top of the target
  return targetTouchingPlayer(target) && player.dy < player.maxBumpSpeed && player.y + player.size / 2 < target.y;
}


function targetTouchingPlayer(target) {
  // Checks if the player is touching the target
  return dist(target.x, target.y, player.x + player.size / 2, player.y + player.size / 2) < player.size / 2 + target.radius;
}


function moveTargets() {
  // Moves all the targets
  for (let target of theTargets) {
    // Gets the angle between the target and the player
    let angle = atan2(player.y - target.y + player.size / 2, player.x - target.x + player.size / 2);
    // Target Moves in a straight line towards the player
    target.y += sin(angle) * target.speed;
    target.x += cos(angle) * target.speed;
  }
}


function checkTargetTouchingTarget() {
  // Checks if any 2 targets are touching each other
  // List of targets to merge
  toMerge = [];
  // Compares all targets to eachother
  for (let targetIndex = 0; targetIndex < theTargets.length; targetIndex++) {
    let target = theTargets[targetIndex];
    for (let otherTargetIndex = targetIndex + 1; otherTargetIndex < theTargets.length; otherTargetIndex++) {
      let otherTarget = theTargets[otherTargetIndex];
      // Checks if the targetes are touchign
      if (dist(target.x, target.y, otherTarget.x, otherTarget.y) < target.radius + otherTarget.radius) {
        // Addds targets to the to merge list
        toMerge.push([target, otherTarget]);
      }
    }
  }
  // Merges all touching targets
  for (let targetsToMerge of toMerge) {
    mergeTargets(targetsToMerge[0], targetsToMerge[1]);
  }
}


function mergeTargets(target1, target2) {
  // Merges touching targets
  // Creates new larger target
  let someTarget = {
    x: (target1.x + target2.x) / 2,
    y: (target1.y + target2.y) / 2,
    speed: (target1.speed + target2.speed) / 2,
    radius: (target1.radius ** 2 + target2.radius ** 2) ** 0.5,
    color: "red",
    multiplier: target1.multiplier + target2.multiplier
  };
  theTargets.push(someTarget);
  // Dellets the 2 old targets
  theTargets.splice(theTargets.indexOf(target1), 1);
  theTargets.splice(theTargets.indexOf(target2), 1);
}


function drawTargets() {
  // Displays all targets
  stroke("black");
  strokeWeight(3);
  for (let target of theTargets) {
    fill(target.color);
    circle(target.x, target.y, target.radius * 2);
  }
}


function spawnTarget() {
  // Spawns a target
  let someTarget = {
    x: random(0, width),
    y: (player.y < cameraMoveThreshold) * (player.y - cameraMoveThreshold),
    speed: 7,
    radius: 15,
    color: "red",
    multiplier: 1
  };
  theTargets.push(someTarget);
}


function drawFloor() {
  // Displays the green floor
  noStroke();
  fill(0, 85, 0);
  rect(0, height - floorHeight, width, floorHeight);
}


function calculatePlayerMovement() {
  // Calculates the player's movment
  // Changes player's X cordinate
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

  // Changes player's Y cordinate
  if (player.y > height - player.size - floorHeight) {
    player.y = height - player.size - floorHeight;
  }
  else {
    player.y -= player.dy;
  }
}


function drawPlayer() {
  // Displays player
  stroke(player.strokeColor);
  strokeWeight(player.strokeSize);

  // Player's color depends on the player's health
  fill(paletteLerp([
    ["red", 0],
    ["yellow", player.startingHealth / 2],
    ["green", player.startingHealth]
  ], player.health));
  // Makes the square
  square(player.x + player.strokeSize / 2, player.y + player.strokeSize / 2, player.size - player.strokeSize, player.curve);
}


function playerJump() {
  // Makes the player jump
  // Checks if space pressed and player is on the ground
  if (player.y === height - player.size - floorHeight && keyIsDown(32)) {
    player.dy = player.jumpSpeed;
  }
  else if (player.y < height - player.size - floorHeight) {
    // Player slows down because of gravity
    player.dy -= player.gravity;
  }
  else {
    player.dy = 0;
  }
}


function playerMove() {
  // Makes player move vertically
  if (keyIsDown(65)) { // A
    // Moves the player left
    player.dx -= player.acceleration;
    if (player.dx < -player.maxSpeed) {
      player.dx = -player.maxSpeed;
    }
  }
  else if (keyIsDown(68)) { // D
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

