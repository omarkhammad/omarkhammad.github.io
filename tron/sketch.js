// Tron
// Omar Hammad

const BACKGROUND_COLOR = [0, 0, 0, 255];
const EDGE_THICKNESS = 10;
const EDGE_ROUNDNESS = 15;
let edgeColor1, edgeColor2;

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
let lastLineLength;

const FPS = 60;


function preload() {
  // connect to a p5party server
  partyConnect(
    "wss://demoserver.p5party.org",
    "tron"
  );

  p1 = partyLoadShared("p1", p1);
  p2 = partyLoadShared("p2", p2);
}




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

  edgeColor1 = color("red");
  edgeColor2 = color("blue");

  for(let x=0; x<width; x++){
    n = map(x,0,width,0,1);
    let newc = lerpColor(edgeColor1, edgeColor2, n);
    stroke(newc);
    line(x, 0, x, height);
  }
}


function draw() {
  if (playerTouchingLine(p1)) {

  }
  else if (playerTouchingLine(p2)) {

  }
  else {
    displayBackground();

    calculatePlayerMovment(p1);
    calculatePlayerMovment(p2);

    deleteLine(p1);
    deleteLine(p2);

    displayLine(p1);
    displayLine(p2);

    displayPlayer(p1);
    displayPlayer(p2);
  }
}


function displayBackground() {
  noStroke();
  fill(BACKGROUND_COLOR);
  rect(EDGE_THICKNESS, EDGE_THICKNESS, width - EDGE_THICKNESS * 2, height - EDGE_THICKNESS * 2, EDGE_ROUNDNESS);
}


function deleteLine(player) {
  if (player.linePoints.length && player.linePoints[0][2] < millis() - lineLength) {
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
    if (player.linePoints.length) {
      lastPoint = player.linePoints[0];
      lastLineLength = player.linePoints[0][2] - millis() + lineLength;
    }
    else {
      lastPoint = [player.x, player.y];
      lastLineLength = lineLength;
    }
    let y = Math.sign(player.deletedLine[1] - lastPoint[1]) * lastLineLength * player.msToPixels + lastPoint[1];
    let x = Math.sign(player.deletedLine[0] - lastPoint[0]) * lastLineLength * player.msToPixels + lastPoint[0];
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
