// Connected Nodes OOP

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for (let point of points) {
    point.update();
    point.connectTo(points);
  }

  for (let point of points) {
    point.display();
  }

  // spawnPoint(mouseX, mouseY);
}

function mousePressed() {
  spawnPoint(mouseX, mouseY);
}

function spawnPoint(x, y) {
  let somePoint = new MovingPoint(x, y);
  points.push(somePoint);
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.color = color(random(255), random(255), random(255));
    this.xTime = random(10000);
    this.yTime = random(10000);
    this.deltaTime = 0.01;
    this.reach = 150;
    this.MIN_RADIUS = 15;
    this.MAX_RADIUS = 50;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update() {
    this.move();
    this.wrapAround();
  }

  adjustSizeWithMouse() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistancce < this.reach) {
      let theSize = map(mouseDistance, 0, this.reach, this.MAX_RADIUS, this.MIN_RADIUS);
      this.radius = theSize;
    }
    else {
      this.radius = this.MIN_RADIUS;
    }
  }

  move() {
    // Pick random direction movment
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);
    
    // Scale to the movment speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    // Move point
    this.x += this.dx;
    this.y += this.dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAround() {
    if (this.x < 0 || this.x > width ) {
      this.x = -this.x + width;
    }
    
    if (this.y < 0 || this.y > height) {
      this.y = -this.y + height;
    }
  }

  connectTo(pointsArray) {
    for (let otherPoint of pointsArray) {
      if (this !== otherPoint){
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDistance < this.reach) {
          stroke(this.color);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }
}