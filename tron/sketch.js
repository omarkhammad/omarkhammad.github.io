// Tron
// Omar Hammad

const BACKGROUND_COLOR = [255, 255, 255, 255];

let p1 = {
  dx: 0,
  dy: 5,
  speed: 5,
  size: 5,
  linePoints: [],
  delletedLine:[],
};

let lineLength = 5000;

function setup() {
  createCanvas(windowWidth, windowHeight);

  p1.x = width / 2;
  p1.y = height / 2;
  savePoint(p1);
}


function draw() {
  background(BACKGROUND_COLOR);

  calculatePlayerMovment();

  deleteLine();

  displayLine();

  playerTouchingLine();

  displayPlayer();
}


function deleteLine() {
  if (p1.linePoints[0][2] < millis() - lineLength) {
    p1.delletedLine = [p1.linePoints[0], p1.linePoints[1]];
    p1.linePoints.splice(0, 1);
  }
}


function playerTouchingLine() {
  if (get(p1.x + p1.dx, p1.y - p1.dy).toString() !== BACKGROUND_COLOR.toString()) {
    
  }
}



function displayLine() {
  noFill();
  strokeJoin(MITER);
  stroke("red");
  strokeWeight(5);

  beginShape();
  for (let linePoint of p1.linePoints) {
    vertex(linePoint[0], linePoint[1]);
  }
  vertex(p1.x, p1.y);
  
  endShape();
}


function displayPlayer() {
  circle(p1.x, p1.y, p1.size * 2);
}


function calculatePlayerMovment() {
  p1.x += p1.dx;
  p1.y -= p1.dy;
}


function keyPressed() {
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
}

function savePoint(player) {
  player.linePoints.push([player.x, player.y, millis()]);
  console.log(player.linePoints[player.linePoints.length - 1][2]);
}
