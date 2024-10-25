// Grid Demo
// Omar Hammad
// Oct 22, 2024

// if hardcoding the grid, use something like this:
// let grid = [[1, 0, 1, 0],
//             [0, 0, 1, 1],
//             [1, 1, 1, 0],
//             [0, 1, 1, 0]];

let grid;
let gridSize = 2;
let cellSize;
let shouldToggleNeighbours = true;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/gridSize;
  grid = generateRandomGrid(gridSize, gridSize);
}

function draw() {
  background(220);
  displayGrid();
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(gridSize, gridSize);
  }
  if (key === "e") {
    grid = generateEmptyGrid(gridSize, gridSize);
  }
  if (key === "n") {
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }
}

function displayGrid() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x]) {
        fill("blue");
      }
      else {
        fill("orange");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //choose either 0 or 1, each 50% of the time
      if (random(100) < 50) {
        newGrid[y].push(true);
      }
      else {
        newGrid[y].push(false);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function mouseClicked() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);
  toggleCell(x, y);

  if (shouldToggleNeighbours) {
    if (x > 0) {
      toggleCell(x - 1, y);
    }
    
    if (x < gridSize) {
      toggleCell(x + 1, y);
    }
    
    if (y > 0) {
      toggleCell(x, y - 1);
    }
    
    if (y < gridSize) {
      toggleCell(x, y + 1);
    }
  }
  if (allBlue()) {
    nextLevel();
  }
}


function toggleCell(x, y) {
  grid[y][x] = !grid[y][x];
}


function allBlue() {
  for (let y of grid) {
    for (let x of grid) {
      if (!grid[y][x]) {
        return false;
      }
    }
  }
  return true;
}


function nextLevel() {
  gridSize++;
  generateRandomGrid(gridSize, gridSize);
}

