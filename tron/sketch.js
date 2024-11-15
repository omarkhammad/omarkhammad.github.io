// Tron
// Omar Hammad

// PLEASE CLICK THE SCREEN FOR SOUND TO PLAY

// Extra for expert features:
// 1. Background gradient written with code
// 2. Player turns are stored in a 2D Array as [x, y, time of turn] & removes the turns based on the time the turns were made
// 3. Displays the player's line as a vertex


// Background gradient constants
const BACKGROUND_COLOR = [0, 0, 0, 255];
const EDGE_THICKNESS = 20;
const EDGE_ROUNDNESS = 60;

// Color of who won the game
let gameWon = "";

// Tilt and list for game over gradient
let TILT_X_SHIFT = 10;
let TILT_Y_SHIFT = 1;
let textColorGradients;

// Length of player line
let LINE_LENGTH = 5000;

// Last deleted turn taken
let lastLineLength;

let turnSound;

const FPS = 60;

// Red player
let playerOne = {
  dx: 0,
  dy: 5,
  speed: 5,
  size: 5,
  linePoints: [],
  deletedPoint:[],
  color: "Red",
  lineSize: 10
};

// Blue player
let playerTwo = {
  dx: 0,
  dy: 5,
  speed: 5,
  size: 5,
  linePoints: [],
  deletedPoint:[],
  color: "Blue",
  lineSize: 10
};

// Preloads sound
function preload() {
  turnSound = loadSound('turn.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  // Sets text settings
  textStyle(BOLDITALIC);
  textAlign(CENTER, CENTER);
  // Sets stroke settings
  strokeCap(SQUARE);
  strokeJoin(MITER);
  //Sets frame rate
  frameRate(FPS);

  // Red player starting coordinates
  playerOne.x = width * 2 / 5;
  playerOne.y = height / 2;
  // Blue player starting coordinates
  playerTwo.x = width * 3 / 5;
  playerTwo.y = height / 2;
  
  // Later used for calculations for smooth player line removal
  playerOne.msToPixels = playerOne.speed * FPS / 1000;
  playerTwo.msToPixels = playerTwo.speed * FPS / 1000;

  // Saves player starting coordinates as first "turns"
  savePoint(playerOne);
  savePoint(playerTwo);

  // Gradient for game over texts
  textColorGradients =
    [color(255, 0, 0),
      color(235, 0, 86),
      color(205, 0, 126),
      color(167, 0, 173),
      color(0, 0, 255)];

  // Draws the red-blue gradient around the edge
  drawGradient();
}


function draw() {
  if (gameWon) {  // Checks if the game was won by a player
    gameOver();
  }
  else {
    // Draws curved black rectangle as a background
    displayBackground();
    // Mashes numbers for players' movement
    calculatePlayerMovement(playerOne);
    calculatePlayerMovement(playerTwo);
    // Deletes last point turn if it exceeds its "lifetime"
    deleteLine(playerOne);
    deleteLine(playerTwo);
    // Pretty self explanatory
    displayLine(playerOne);
    displayLine(playerTwo);
    // Pretty self explanatory
    displayPlayer(playerOne);
    displayPlayer(playerTwo);
    // Checks if the player is touching a line or the edge
    playerTouchingLine(playerOne);
    playerTouchingLine(playerTwo);
  }
}


function displayBackground() {
  // Draws curved black rectangle as a background
  noStroke();
  fill(BACKGROUND_COLOR);
  rect(EDGE_THICKNESS, EDGE_THICKNESS, width - EDGE_THICKNESS * 2, height - EDGE_THICKNESS * 2, EDGE_ROUNDNESS);
}


function deleteLine(player) {
  // Deletes last point turn if it exceeds its "lifetime"
  if (player.linePoints.length && player.linePoints[0][2] < millis() - LINE_LENGTH) {
    // Saves point as deleted point
    player.deletedPoint = player.linePoints[0], player.linePoints[1];
    // Removes point
    player.linePoints.splice(0, 1);
  }
}


function playerTouchingLine(player) {
  // Checks if the player is touching a line or the edge
  if (get(player.x + player.dx * 2.5, player.y - player.dy * 2.5).toString() !== BACKGROUND_COLOR.toString()) {
    // Checks who lost
    if (player.color === playerOne.color) {
      // Blue Won
      gameWon = playerTwo.color;
    }
    else {
      // Red Won
      gameWon = playerOne.color;
    }
  }
}


function drawGradient() {
  // Draws the red-blue gradient around the edge
  let edgeColor1 = color("red");
  let edgeColor2 = color("blue");
  
  // Creates different vertical lines for every X coordinate
  for(let x = 0; x < width; x++){
    n = map(x, 0, width, 0, 1);
    let newc = lerpColor(edgeColor1, edgeColor2, n);
    stroke(newc);
    line(x, 0, x, height);
  }
}


function displayLine(player) {
  // Displays player Line
  noFill();
  stroke(player.color);
  strokeWeight(player.lineSize);

  // Starts shape
  beginShape();

  // This WHOLE thing makes the tail of the line and I don't really feel like explaining it all
  if (player.deletedPoint.length) {
    if (player.linePoints.length) {
      lastPoint = player.linePoints[0];
      lastLineLength = player.linePoints[0][2] - millis() + LINE_LENGTH;
    }
    else {
      lastPoint = [player.x, player.y];
      lastLineLength = LINE_LENGTH;
    }
    let y = Math.sign(player.deletedPoint[1] - lastPoint[1]) * lastLineLength * player.msToPixels + lastPoint[1];
    let x = Math.sign(player.deletedPoint[0] - lastPoint[0]) * lastLineLength * player.msToPixels + lastPoint[0];
    vertex(x, y);
  }

  // Sets vertex point for every turn point
  for (let linePoint of player.linePoints) {
    vertex(linePoint[0], linePoint[1]);
  }

  // Last vertex point is the player
  vertex(player.x, player.y);
  
  // Ends shape
  endShape();
}


function displayPlayer(player) {
  // Draws player as a circle
  stroke(player.color);
  circle(player.x, player.y, player.size * 2);
}


function calculatePlayerMovement(player) {
  // VERY VERY VERY complicated calculus and arithmetic
  // This syntax very complex and may be difficult to understand
  // Feel free to skip this part as it requires very high understanding in number theory

  // This line of code manipulates the player's X coordinate by adding the player's X velocity to the X coordinate (by doing this 60 times per second, I created the illusion of movement)
  player.x += player.dx;

  // Now this line is somewhat similar, but it instead manipulates the player's Y coordinate by SUBTRACTING the player's Y velocity from the Y coordinate (by doing this 60 times per second, I created the illusion of movement)
  // The reason we subtract instead of add the player's velocity here is because its simpler to make the positive Y velocity be up instead of down and the negative Y velocity down instead of up
  player.y -= player.dy;
}


function keyPressed() {
  // Player 1
  if (key === 'w' && playerOne.dy === 0) { // Up
    playerOne.dy = playerOne.speed;
    playerOne.dx = 0;
    savePoint(playerOne);
  }
  if (key === 's' && playerOne.dy === 0) { // Down
    playerOne.dy = -playerOne.speed;
    playerOne.dx = 0;
    savePoint(playerOne);
  }
  if (key === 'a' && playerOne.dx === 0) { // Left
    playerOne.dy = 0;
    playerOne.dx = -playerOne.speed;
    savePoint(playerOne);
  }
  if (key === 'd' && playerOne.dx === 0) { // Right
    playerOne.dy = 0;
    playerOne.dx = playerOne.speed;
    savePoint(playerOne);
  }

  // Player 2
  if (key === 'ArrowUp' && playerTwo.dy === 0) { // Up
    playerTwo.dy = playerTwo.speed;
    playerTwo.dx = 0;
    savePoint(playerTwo);
  }
  if (key === 'ArrowDown' && playerTwo.dy === 0) { // Down
    playerTwo.dy = -playerTwo.speed;
    playerTwo.dx = 0;
    savePoint(playerTwo);
  }
  if (key === 'ArrowLeft' && playerTwo.dx === 0) { // Left
    playerTwo.dy = 0;
    playerTwo.dx = -playerTwo.speed;
    savePoint(playerTwo);
  }
  if (key === 'ArrowRight' && playerTwo.dx === 0) { // Right
    playerTwo.dy = 0;
    playerTwo.dx = playerTwo.speed;
    savePoint(playerTwo);
  }
}


function savePoint(player) {
  // Saves player's turn coordinates to the player's 2D array
  player.linePoints.push([player.x, player.y, millis()]);
  // Plays turn sound
  turnSound.play();
}


function gameOver() {
  // Displays text when game is won/lost and stops the game
  textSize(200);
  fill("black");

  // Creates multiple layers of text to make a gradient illusion
  for (let textNumber = 0; textNumber < textColorGradients.length; textNumber++) {
    stroke(textColorGradients[textNumber]);
    text(gameWon + " Wins", width / 2 + TILT_X_SHIFT * (textColorGradients.length - textNumber), height / 2 + TILT_Y_SHIFT * (textColorGradients.length - textNumber));
  }

  // Displays instructions to restart
  stroke("white");
  fill("black");
  strokeWeight(3);
  textSize(40);
  text("press F5 to restart", width / 2, height * 3 / 4);
}


function windowResized() {
  // Resizes the game if the window size changes
  resizeCanvas(windowWidth, windowHeight);
}
// Hey look! The number of lines of code is prime!