// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let lightState = 0;
let cycleTime = 4000;
let redTime = 1200;
let yellowTime = 1700;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);


  if (millis() % cycleTime > yellowTime) {
    lightState = 2;
  } else if (millis() % cycleTime > redTime) {
    lightState = 1;
  } else {
    lightState = 0;
  }


  //lights
  if (!lightState) {
    fill("red");
    ellipse(width / 2, height / 2 - 65, 50, 50); //top
  } else if (lightState === 1) {
    fill("yellow");
    ellipse(width / 2, height / 2, 50, 50); //middle
  } else {
    fill("green");
    ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
  }
}