// Walker OOP Demo

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.radius = 5;
    this.color = theColor;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      this.y -= this.speed;
    }
    else if (choice < 50) {
      this.y += this.speed;
    }
    else if (choice < 75) {
      this.x -= this.speed;
    }
    else if (choice < 100) {
      this.x += this.speed;
    }
  }
}

let luc;
let michael;

function setup() {
  frameRate(2000);
  createCanvas(windowWidth, windowHeight);
  luc = new Walker(width / 2, height / 2, "red");
  michael = new Walker(width / 4, height / 2, "blue");
}

function draw() {
  luc.move();
  michael.move();
  luc.display();
  michael.display();
}
