// Omar Hammad's Interactive Scene

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
let healthBarWidth = 240;
let healthBarTilt = 24;

let rows;
let columns;
let minRows = 3;
let midRows = 7;
let maxRows = 14;
let minColumns = 10;
let midColumns = 20;
let maxColumns = 30;
let laserSize = 30;
let laserColor;
let lowLaserOpacity = 128;
let highLaserOpacity = 255;
let laserCooldownTime = 70;
let laserTimer = laserCooldownTime;
let laserMode = 0;
let laserWarningTime = 80;
let laserOnTime = 120;
let laserTimeLoss = 5;
let laserRound = 0;
let minCooldown = 15;

let titleText = "L A S E R    D A S H";
let titleXShitf = 6;
let titleYShift = 0;
let textColorGradients;


function gameOver() {
  background("white");
  textSize(200);

  // Displays the Game Over text and stops the game
  for (let textNumber = 0; textNumber < textColorGradients.length; textNumber++) {
    // Creates multiple layers of text to make a gradient illusion
    fill(textColorGradients[textNumber]);
    text("Game Over", width / 2 + titleXShitf * (textColorGradients.length - textNumber), height / 2 + titleYShift * (textColorGradients.length - textNumber));
  }

  // Displays instructions to restart
  fill("black");
  textSize(40);
  text("press F5 to restart", width / 2, height * 3 / 4);
}


function windowResized() {
  // Resizes the game if the window size changes
  resizeCanvas(windowWidth, windowHeight);
}


function playerDash() {
  // Cooldown for player dash
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

  // Allows the player to dash using the mouse button
  if (mouseIsPressed && dashTimer === 0) {
    dash = dashMultiplier;
    dashTimer = -dashLength;
  }
}


function playerMove() {
  // Moves player up
  if (keyIsDown(87)) { //W
    dy -= acc;
    if (dy < -maxSpeed) {
      dy = -maxSpeed;
    }
  } // Moves player down
  else if (keyIsDown(83)) { //S
    dy += acc;
    if (dy > maxSpeed) {
      dy = maxSpeed;
    }
  } // Decelerates the player vertically
  else if (Math.abs(dy) > minSpeed) {
    dy = dy * decc;
  } // Stops the player vertically
  else {
    dy = 0;
  }

  // Moves the player left
  if (keyIsDown(65)) { //A
    dx -= acc;
    if (dx < -maxSpeed) {
      dx = -maxSpeed;
    }
  } // Moves the player right
  else if (keyIsDown(68)) { //D
    dx += acc;
    if (dx > maxSpeed) {
      dx = maxSpeed;
    }
  } // Decelerates the player horizontally
  else if (Math.abs(dx) > minSpeed) {
    dx = dx * decc;
  } // Stops the player horizontally
  else {
    dx = 0;
  }

  // Calculates the player's total motion
  playerX += dx * dash / (playerSquish / playerMaxSquish / 2 + 1);
  playerY += dy * dash * (playerSquish / playerMaxSquish / 2 + 1);

  // Checks if the player is against the wall
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
  // If the player scrolls up, the "squish" variable goes up, making the ball longer 
  if (event.delta < 0) {
    playerSquish += playerSquishSpeed;
    if (playerSquish > playerMaxSquish) {
      playerSquish = playerMaxSquish;
    }
  } // If the player scrolls down, the "squish" variable goes down, making the ball flatter 
  else {
    playerSquish -= playerSquishSpeed;
    if (playerSquish < -playerMaxSquish) {
      playerSquish = -playerMaxSquish;
    }
  }
}


function drawCircle() {
  // Draws the ball
  fill("green");
  ellipse(playerX, playerY, playerSize * 2 - playerSquish, playerSize * 2 + playerSquish);
}


function lasers() {
  // Ticks the laser timer
  laserTimer--;

  // If the laser timer is zero, selects a random number of rows and columns and makes them apear translucent
  if (!laserTimer) {
    rows = random(minRows, maxRows);

    if (rows > midRows) {
      columns = random(minColumns, midColumns);
    }
    else {
      columns = random(midColumns, maxColumns);
    }

    laserMode = 1;
    laserColor.setAlpha(lowLaserOpacity);
    playerIsHurt = false;
  }
  // When the laser is on for long enough, turns off lasers and resets laser timer
  else if (laserTimer < -laserOnTime) {

    // Slowly makes the game go faster
    laserRound++;
    if (laserCooldownTime - laserTimeLoss * laserRound > minCooldown) {
      laserTimer = laserCooldownTime - laserTimeLoss * laserRound;
    }
    else{
      laserTimer = minCooldown;
    }
    
    laserMode = 0;
  }
  // When it is time for the laser to be on, it makes the laser opaque and lets them deal damage to the player
  else if (laserTimer < -laserWarningTime) {
    laserColor.setAlpha(highLaserOpacity);
    laserMode = 2;
  }


  if (laserMode) {
    fill(laserColor);
    // For loop that creates all the row lasers 
    for (let row = 0; row < rows; row++) {
      // Creates the rectangle of the row laser
      rect(0, playerSize + barHeight + row * (height - barHeight - playerSize * 2 - laserSize) / (rows - 1), width, laserSize);
      // If it is time for the laser to deal damage and the the player is touching the row laser, it will decrease the player's health
      if (!playerIsHurt && laserMode === 2 && playerY - playerSize - playerSquish / 2 < laserSize + playerSize + barHeight + row * (height - barHeight - playerSize * 2 - laserSize) / (rows - 1) && playerY + playerSize + playerSquish / 2 > playerSize + barHeight + row * (height - barHeight - playerSize * 2 - laserSize) / (rows - 1)) {
        playerIsHurt = true;
        playerHealth--;
      }
    }

    // For loop that creates all the column lasers 
    for (let column = 0; column < columns; column++) {
      // Creates the rectangle of the column laser
      rect(playerSize + column * (width - playerSize * 2 - laserSize) / (columns - 1), barHeight, laserSize, height - barHeight);
      // If it is time for the laser to deal damage and the the player is touching the column laser, it will decrease the player's health
      if (!playerIsHurt && laserMode === 2 && playerX - playerSize + playerSquish / 2 < laserSize + playerSize + column * (width - playerSize * 2 - laserSize) / (columns - 1) && playerX + playerSize - playerSquish / 2 > playerSize + column * (width - playerSize * 2 - laserSize) / (columns - 1)) {
        playerIsHurt = true;
        playerHealth--;
      }
    }
  }
}


function topBar() {
  // Creates the top black bar
  fill("black");
  rect(0, 0, width, barHeight);

  // Creates the dashing bar
  stroke("white");
  fill("grey");
  rect(barPadding, barPadding, dashCooldown * dashBarWidthScale + playerSize * 2, barHeight - barPadding * 2, barHeight);
  fill(color(78, 79, 255));
  rect(barPadding, barPadding, (dashCooldown - dashTimer) * dashBarWidthScale * (dashTimer >= 0) + playerSize * 2, barHeight - barPadding * 2, barHeight);

  // Creates the red health bar
  fill("grey");
  quad(width - barPadding - healthBarWidth - healthBarTilt, barPadding, width - barPadding - healthBarWidth, barHeight - barPadding, width - barPadding, barHeight - barPadding, width - barPadding - healthBarTilt, barPadding);
  fill("red");
  quad(width - barPadding - healthBarTilt - healthBarWidth * playerHealth / playerMaxHealth, barPadding, width - barPadding - healthBarWidth * playerHealth / playerMaxHealth, barHeight - barPadding, width - barPadding, barHeight - barPadding, width - barPadding - healthBarTilt, barPadding);
  noStroke();
}


function title() {
  // Creates the top title
  // eslint-disable-next-line no-undef
  textStyle(BOLDITALIC);
  textAlign(CENTER, CENTER);
  textSize(50);
  // Creates multiple layers of text to make a gradient illusion
  for (let textNumber = 0; textNumber < textColorGradients.length; textNumber++) {
    fill(textColorGradients[textNumber]);
    text(titleText, width / 2 + titleXShitf * (textColorGradients.length - textNumber), barHeight / 2 + titleYShift * (textColorGradients.length - textNumber));
  }
}


function drawBackground() {
  // Creates a white curved rectangle as the background to make the curved corners
  background("black");
  fill("white");
  rect(0, barHeight, width, height - barHeight, playerSize);
}


function setup() {
  // Makes the game take up the full screen
  createCanvas(windowWidth, windowHeight);
  strokeWeight(3);

  // Sets the player to the center of the screen
  playerX = width / 2;
  playerY = height / 2;

  // Sets the laser's base color
  laserColor = color(230, 0, 0);
  // Sets the Gradient for the titles
  textColorGradients = [color(255, 193, 0), color(255, 154, 0), color(255, 116, 0), color(255, 77, 0), color(255, 0, 0)];
}


function draw() {
  // Only runs the Game Over function if the player health is zero
  if (!playerHealth) {
    gameOver();
  }
  else {
    // Draws the white background
    drawBackground();

    // Draws the player's circle
    drawCircle();

    // Draws the top bar, dashing bar, and the health bar
    topBar();

    // Draws the title
    title();

    // checks if the player dashes
    playerDash();

    // calculates all player movements
    playerMove();

    // creates the lasers
    lasers();
  }
}