// Perlin Noise Ball Demo

let x;
let y;
let time = 0;
let time_speed = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  noStroke();
}

function draw() {
  fill(random(255), random(255), random(255));
  time += time_speed;

  x = noise(time) * width;
  y = noise(time + 10000) * height;
   circle(x, y, 20);
}
