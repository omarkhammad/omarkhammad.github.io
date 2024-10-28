// Grid Demo
// Omar Hammad
// Oct 22, 2024

// if hardcoding the grid, use something like this:
// let grid = [[1, 0, 1, 0],
//             [0, 0, 1, 1],
//             [1, 1, 1, 0],
//             [0, 1, 1, 0]];

let grid;
const GRID_SIZE = 40;
let cellSize;
let shouldToggleNeighbours = false;
let autoPlay = false;
let render = 5;
let gosperGun;


function preload() {
  gosperGun = loadJSON("gosper.json");
}


function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
  if (autoPlay && frameCount % render === 0) {
    grid = updateGrid();
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);

  //toggle neighbours
  if (shouldToggleNeighbours) {
    toggleCell(x + 1, y);
    toggleCell(x - 1, y);
    toggleCell(x, y + 1);
    toggleCell(x, y - 1);
  }

  if (key === " ") {
    grid = updateGrid();
  }
}


function updateGrid() {
  // Make a new array to hold the next turn
  let nextTurn = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  // Look at every cell
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      // Count it's neighbours
      let neighbours = 0;

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          // don't fall off the edge
          if (y + i > 0 && y + i < GRID_SIZE - 1 && x + j > 0 && x + j < GRID_SIZE && (j || i)) {
            neighbours += grid[y + i][x + j];
          }
        }
      }
      // Apply the rules
      if (grid[y][x] === 0) {
        //currently dead
        if(neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

      if (grid[y][x] === 1) {
        // Currently alive
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  return nextTurn;
}


function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE) {
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else {
      grid[y][x] = 1;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "n") {
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }
  if (key === "a") {
    autoPlay = !autoPlay;
  }
  if (key === "g") {
    grid = gosperGun;
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x] === 0) {
        fill("white");
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
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
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