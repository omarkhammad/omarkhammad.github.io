// Square Moving around The Screen
// Sept 10, 2024


let direction = "r";
let x = 0;
let y = 0;
let speed = 100;
let size = 50;

function setup() {
  createCanvas(400, 400);
}

function goof() {
  fill(random(255), random(255), random(255))
  speed = random(2, 100)
  size = random(10, 100);
}


function draw() {
  background(220);
  rect(x, y, size);
  if (direction === "r") {
    x += speed;
    if (x >= width - size) {
      direction = "d";
      x = width - size;
      goof()
    }
  } else if (direction === "l") {
    x -= speed;
    if (x <= 0) {
      direction = "u";
      x = 0;
      goof()
    }
  } else if (direction === "u") {
    y -= speed;
    if (y <= 0) {
      direction = "r";
      y = 0;
      goof()
    }
  } else if (direction === "d") {
    y += speed;
    if (y >= height - size) {
      direction = "l";
      y = height - size;
      goof()
    }
  }
}
