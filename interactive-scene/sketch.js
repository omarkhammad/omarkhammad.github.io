// Interactive Scene
// Demo

let playerX;
let playerY;
let playerSize = 20;
let maxSpeed = 4;
let minSpeed = 0.75;
let dx = 0;
let dy = 0;
let acc = 2;
let decc = 0.6;
let playerSquish = 0;
let playerSquishSpeed = 4;
let playerMaxSquish = playerSize;
let playerMaxHealth = 5;
let playerHealth = playerMaxHealth;
let playerIsHurt = false;

let dashCooldown = 60;
let dashTimer = 0;
let dashMultiplier = 3;
let dash = 1;
let dashLength = 8;

let barHeight = 60;
let barPadding = 10;
let dashBarWidthScale = 3;
let healthBarWidth = 240
let healthBarTilt = 24

let rows;
let columns;
let minRows = 3;
let maxRows = 3;
let totalLasers = 30;
let laserSize = 30;
let laserColor;
let lowLaserOpacity = 128;
let highLaserOpacity = 255;
let laserCooldownTime = 70;
let laserTimer = laserCooldownTime;
let laserMode = 0;
let laserWarningTime = 80;
let laserOnTime = 120;

let titleText = 'L A S E R    D A S H';
let titleXShitf = 6;
let titleYShift = 0;
let colorGradients = []


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function playerDash() {
  if (dashTimer > 0) {
    dashTimer--;
  }
  else if (dashTimer === -1) {
    dash = 1;
    dashTimer = dashCooldown;
  }
  else if (dashTimer < -1) {
    dashTimer++;
  }

  if (mouseIsPressed && dashTimer === 0) {
    dash = dashMultiplier;
    dashTimer = -dashLength;
  }
}


function playerMove() {
  if (keyIsDown(87)) { //W
    dy -= acc;
    if (dy < -maxSpeed) {
      dy = -maxSpeed;
    }
  }
  else if (keyIsDown(83)) { //S
    dy += acc;
    if (dy > maxSpeed) {
      dy = maxSpeed;
    }
  }
  else if (Math.abs(dy) > minSpeed) {
    dy = dy * decc;
  }
  else {
    dy = 0;
  }

  if (keyIsDown(65)) { //A
    dx -= acc;
    if (dx < -maxSpeed) {
      dx = -maxSpeed;
    }
  }
  else if (keyIsDown(68)) { //D
    dx += acc;
    if (dx > maxSpeed) {
      dx = maxSpeed;
    }
  }
  else if (Math.abs(dx) > minSpeed) {
    dx = dx * decc;
  }
  else {
    dx = 0;
  }

  playerX += dx * dash / (playerSquish / playerMaxSquish / 2 + 1);
  playerY += dy * dash * (playerSquish / playerMaxSquish / 2 + 1);

  if (playerX < playerSize) {
    playerX = playerSize;
  }
  else if (playerX > width - playerSize) {
    playerX = width - playerSize;
  }
  if (playerY < playerSize + barHeight) {
    playerY = playerSize + barHeight;
  }
  else if (playerY > height - playerSize) {
    playerY = height - playerSize;
  }
}


function mouseWheel(event) {
  if (event.delta < 0) {
    playerSquish += playerSquishSpeed;
    if (playerSquish > playerMaxSquish) {
      playerSquish = playerMaxSquish;
    }
  }
  else {
    playerSquish -= playerSquishSpeed;
    if (playerSquish < -playerMaxSquish) {
      playerSquish = -playerMaxSquish;
    }
  }
}


function drawCircle() {
  fill("green");
  ellipse(playerX, playerY, playerSize * 2 - playerSquish, playerSize * 2 + playerSquish);
}


function lasers() {
  laserTimer--;
  if (!laserTimer) {
    //rows = random(minRows, maxRows);
    //columns = totalLasers - rows;
    rows = 7; //14;
    columns = 16; //32; //20;
    laserMode = 1;
    laserColor.setAlpha(lowLaserOpacity);
    playerIsHurt = false;
  }
  else if (laserTimer < -laserOnTime) {
    laserTimer = laserCooldownTime;
    laserMode = 0;

  }
  else if (laserTimer < -laserWarningTime) {
    laserColor.setAlpha(highLaserOpacity);
    laserMode = 2;
  }


  if (laserMode) {
    fill(laserColor);
    for (let row = 0; row < rows; row++) {
      rect(0, playerSize + barHeight + row * (height - barHeight - playerSize * 2 - laserSize) / (rows - 1), width, laserSize);
      if (!playerIsHurt && laserMode === 2 && playerY - playerSize - playerSquish / 2 < laserSize + playerSize + barHeight + row * (height - barHeight - playerSize * 2 - laserSize) / (rows - 1) && playerY + playerSize + playerSquish / 2 > playerSize + barHeight + row * (height - barHeight - playerSize * 2 - laserSize) / (rows - 1)) {
        playerIsHurt = true;
        playerHealth--;
      }
    }
    console.log(rows);

    for (let column = 0; column < columns; column++) {
      rect(playerSize + column * (width - playerSize * 2 - laserSize) / (columns - 1), barHeight, laserSize, height - barHeight);
      if (!playerIsHurt && laserMode === 2 && playerX - playerSize + playerSquish / 2 < laserSize + playerSize + column * (width - playerSize * 2 - laserSize) / (columns - 1) && playerX + playerSize - playerSquish / 2 > playerSize + column * (width - playerSize * 2 - laserSize) / (columns - 1)) {
        playerIsHurt = true;
        playerHealth--;
      }
    }
  }
}


function topBar() {
  fill("black");
  rect(0, 0, width, barHeight);

  stroke("white");
  fill("grey");
  rect(barPadding, barPadding, dashCooldown * dashBarWidthScale + playerSize * 2, barHeight - barPadding * 2, barHeight);
  fill(color(78, 79, 255));
  rect(barPadding, barPadding, (dashCooldown - dashTimer) * dashBarWidthScale * (dashTimer >= 0) + playerSize * 2, barHeight - barPadding * 2, barHeight);

  fill("grey");
  quad(width - barPadding - healthBarWidth - healthBarTilt, barPadding, width - barPadding - healthBarWidth, barHeight - barPadding, width - barPadding, barHeight - barPadding, width - barPadding - healthBarTilt, barPadding);
  fill("red");
  quad(width - barPadding - healthBarTilt - healthBarWidth * playerHealth / playerMaxHealth, barPadding, width - barPadding - healthBarWidth * playerHealth / playerMaxHealth, barHeight - barPadding, width - barPadding, barHeight - barPadding, width - barPadding - healthBarTilt, barPadding);
  noStroke();
}


function title() {
  textStyle(BOLDITALIC);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255,193,0)
  text(titleText, width / 2 + titleXShitf * 4, barHeight / 2 + titleYShift * 4);
  fill(255,154,0)
  text(titleText, width / 2 + titleXShitf * 3, barHeight / 2 + titleYShift * 3);
  fill(255,116,0)
  text(titleText, width / 2 + titleXShitf * 2, barHeight / 2 + titleYShift * 2);
  fill(255,77,0)
  text(titleText, width / 2 + titleXShitf, barHeight / 2 + titleYShift);
  fill(255,0,0)
  text(titleText, width / 2, barHeight / 2);
}



function drawBackground() {
  background("black");
  fill("white");
  rect(0, barHeight, width, height - barHeight, playerSize);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(3);

  playerX = width / 2;
  playerY = height / 2;

  laserColor = color(230, 0, 0);
}


function draw() {
  drawBackground();

  drawCircle();

  topBar();

  title();

  playerDash();

  playerMove();

  lasers();
}