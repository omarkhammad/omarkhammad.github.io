// Translate & Rotate

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  translate(250, 250);
  rotate(45);
  square(0, 0, 100, 10);
}
