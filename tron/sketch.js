// Tron
// Omar Hammad

let p1 = {
  dx: 0,
  dy: 5,
  speed: 5,
  size: 5,
  linePoints: [],
};

function setup() {
  createCanvas(windowWidth, windowHeight);

  p1.x = width / 2;
  p1.y = height / 2;
  linePoints.push([p1.x, p1.y]);
}


function draw() {
  background(220);
  calculatePlayerMovment();
  displayPlayer();
}


function displayLine() {
  for (let linePoint of p1.linePoints) {
    
  }
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
  }
  if (key === 's' && p1.dy === 0) {
    p1.dy = -p1.speed;
    p1.dx = 0;

  }
  if (key === 'a' && p1.dx === 0) {
    p1.dy = 0;
    p1.dx = -p1.speed;

  }
  if (key === 'd' && p1.dx === 0) {
    p1.dy = 0;
    p1.dx = p1.speed;

  }
}