// Tron
// Omar Hammad

const BACKGROUND_COLOR = [255, 255, 255, 255];

let p1 = {
  dx: 0,
  dy: 5,
  speed: 5,
  size: 5,
  linePoints: [],
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  willReadFrequently = true;

  p1.x = width / 2;
  p1.y = height / 2;
  p1.linePoints.push([p1.x, p1.y]);
}


function draw() {
  background(BACKGROUND_COLOR);
  calculatePlayerMovment();
  displayLine();
  playerTouchingLine();
  displayPlayer();
}


function playerTouchingLine() {
  // Vertical Lines
  if (get(p1.x + p1.dx, p1.y - p1.dy).toString() !== BACKGROUND_COLOR.toString()) {
    console.log(get(p1.x + p1.dx, p1.y - p1.dy));
  }

  //for (let i = 0; i < p1.linePoints.length - 1; i += 2) {
  //  let point1 = p1.linePoints[i];
  //  let point2 = p1.linePoints[i + 1];
  //
  //  if (p1.x === point1 && )
  //}
}



function displayLine() {
  noFill();
  strokeJoin(MITER);
  stroke("red");
  strokeWeight(5);

  beginShape();
  for (let linepoint of p1.linePoints) {
    vertex(linepoint[0], linepoint[1]);
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
    p1.linePoints.push([p1.x, p1.y]);
  }
  if (key === 's' && p1.dy === 0) {
    p1.dy = -p1.speed;
    p1.dx = 0;
    p1.linePoints.push([p1.x, p1.y]);

  }
  if (key === 'a' && p1.dx === 0) {
    p1.dy = 0;
    p1.dx = -p1.speed;
    p1.linePoints.push([p1.x, p1.y]);
  }
  if (key === 'd' && p1.dx === 0) {
    p1.dy = 0;
    p1.dx = p1.speed;
    p1.linePoints.push([p1.x, p1.y]);
  }
}