// Fireworks OOP

const NUMBER_OF_PARTICLES_PER_CLICK = 300;

class Particle {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.size = 5;
    this.r = r;
    this.g = g;
    this.b = b;
    this.opacity = 255;
  }

  isDead() {
    return this.opacity <= 0;
  }

  display() {
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.size);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.opacity -= 5;
  }
}

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);
  for (let firework of theFireworks) {
    firework.update();
    firework.display();
    if (firework.isDead){
      let index = theFireworks.indoexOf(firework);
      theFireworks.splice(index, 1);
      console.log(index);
    }
  }
}

function mousePressed() {
  r = random(255);
  g = random(255);
  b = random(255);
  for (let i = 0; i < NUMBER_OF_PARTICLES_PER_CLICK; i++) {
    let someParticle = new Particle(mouseX, mouseY, r, g, b);
    theFireworks.push(someParticle);
  }
}
