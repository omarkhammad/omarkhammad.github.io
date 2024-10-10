// Bubble Object Demo
// Showing hot to delete objects from the array

let theBubbles = [];
let bubbleSize = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 10; i++) {
    spawnBubble();
  }

  //create a new bubble every half second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);
  displayBubbles();
  // moveBubblesRandomly();
  moveBubblesWithNoise();

}

function spawnBubble() {
  let someBubble = {
    x: random(0, width),
    y: random(0, height),
    speed: random(2, 5),
    radius: random(20, 50),
    r: random(255),
    g: random(255),
    b: random(255),
    alpha: random(255),
    timeX: random(1000000000),
    timeY: random(1000000000),
    noise: random(1000000000),
    deltaTime: 0.003
  };
  theBubbles.push(someBubble);
}


function displayBubbles() {
  for (let bubble of theBubbles) {
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius * 2);
  }
}


function moveBubblesRandomly() {
  for (let bubble of theBubbles) {
    let choice = random(100);
    if (choice < 50) {
      bubble.y -= bubble.speed;
    }
    else if (choice < 65) {
      bubble.y += bubble.speed;
    }
    else if (choice < 75) {
      bubble.x += bubble.speed;
    }
    else {
      bubble.x -= bubble.speed;
    }
  }
}


function moveBubblesWithNoise(){
  for (let bubble of theBubbles) {
    bubble.x = noise(bubble.timeX) * width;
    bubble.y = noise(bubble.timeY) * height;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}


function mousePressed() {
  for (let bubble of theBubbles) {
    if (clickedOnBubble(bubble)) {
      let theIndex = theBubbles.indexOf(bubble);
      theBubbles.splice(theIndex, 1);
    }
  }
}


function clickedOnBubble(theBubble) {
  let distanceAway = dist(mouseX, mouseY, theBubble.x, theBubble.x);
  return dist(mouseX, mouseY, theBubble.x, theBubble.y) <= theBubble.radius;
}

