// Image Demo
// Sept 23, 2024

let spongebob;

function preload(){
  spongebob = loadImage("spongebob.webp")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  
  image(spongebob, mouseX, mouseY, spongebob.width * .5, spongebob.height * .5);
}
