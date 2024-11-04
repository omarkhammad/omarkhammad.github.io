// Tron
// Omar Hammad

const BACKGROUND_COLOR = [255, 255, 255, 255];

let p1 = {
  dx: 0,
  dy: 5,
  speed: 5,
  size: 5,
  linePoints: [],
  deletedLine:[],
  color: "red",
};


let p2 = {
  dx: 0,
  dy: 5,
  speed: 5,
  size: 5,
  linePoints: [],
  deletedLine:[],
  color: "blue",
};

let lineLength = 2000;

const FPS = 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(FPS);

  p1.x = width / 4;
  p1.y = height / 2;

  p2.x = width * 3 / 4;
  p2.y = height / 2;
  
  p1.msToPixels = p1.speed * FPS / 1000;
  p2.msToPixels = p2.speed * FPS / 1000;

  savePoint(p1);
  savePoint(p2);
}


function draw() {
  background(BACKGROUND_COLOR);

  calculatePlayerMovment(p1);
  calculatePlayerMovment(p2);

  deleteLine(p1);
  deleteLine(p2);

  displayLine(p1);
  displayLine(p2);

  playerTouchingLine(p1);
  playerTouchingLine(p2);

  displayPlayer(p1);
  displayPlayer(p2);
}


function deleteLine(player) {
  if (player.linePoints[0][2] < millis() - lineLength) {
    player.deletedLine = player.linePoints[0], player.linePoints[1];
    player.linePoints.splice(0, 1);
  }
}


function playerTouchingLine(player) {
  if (get(player.x + player.dx, player.y - player.dy).toString() !== BACKGROUND_COLOR.toString()) {
    
  }
}



function displayLine(player) {
  noFill();
  strokeJoin(MITER);
  stroke(player.color);
  strokeWeight(5);

  beginShape();

  if (player.deletedLine.length) {
    let y = Math.sign(player.deletedLine[1] - player.linePoints[0][1]) * (player.linePoints[0][2] - millis() + lineLength) * player.msToPixels + player.linePoints[0][1];
    let x = Math.sign(player.deletedLine[0] - player.linePoints[0][0]) * (player.linePoints[0][2] - millis() + lineLength) * player.msToPixels + player.linePoints[0][0];
    vertex(x, y);
  }

  for (let linePoint of player.linePoints) {
    vertex(linePoint[0], linePoint[1]);
  }
  vertex(player.x, player.y);
  
  endShape();
}


function displayPlayer(player) {
  stroke(player.color);
  circle(player.x, player.y, player.size * 2);
}


function calculatePlayerMovment(player) {
  player.x += player.dx;
  player.y -= player.dy;
}


function keyPressed() {
  // Player 1
  if (key === 'w' && p1.dy === 0) {
    p1.dy = p1.speed;
    p1.dx = 0;
    savePoint(p1);
  }
  if (key === 's' && p1.dy === 0) {
    p1.dy = -p1.speed;
    p1.dx = 0;
    savePoint(p1);
  }
  if (key === 'a' && p1.dx === 0) {
    p1.dy = 0;
    p1.dx = -p1.speed;
    savePoint(p1);
  }
  if (key === 'd' && p1.dx === 0) {
    p1.dy = 0;
    p1.dx = p1.speed;
    savePoint(p1);
  }

  // Player 2
  if (key === 'ArrowUp' && p2.dy === 0) {
    p2.dy = p2.speed;
    p2.dx = 0;
    savePoint(p2);
  }
  if (key === 'ArrowDown' && p2.dy === 0) {
    p2.dy = -p2.speed;
    p2.dx = 0;
    savePoint(p2);
  }
  if (key === 'ArrowLeft' && p2.dx === 0) {
    p2.dy = 0;
    p2.dx = -p2.speed;
    savePoint(p2);
  }
  if (key === 'ArrowRight' && p2.dx === 0) {
    p2.dy = 0;
    p2.dx = p2.speed;
    savePoint(p2);
  }
}

function savePoint(player) {
  player.linePoints.push([player.x, player.y, millis()]);
}
