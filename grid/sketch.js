/* eslint-disable indent */
// Grid Demo
// Omar Hammad
// Oct 22, 2024

let gridSize = 50;

let grid;

let cellSize;

function setup() {
  noStroke;
  createCanvas(windowWidth, windowHeight);
  cellSize = height / gridSize;
}

function draw() {
  background(220);

  gridSize = random(1, 100);
  cellSize = height / gridSize;
  grid = generateRandomGrid(gridSize, gridSize);
  displayGrid();
}


function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) {
        fill("black");
      }
      else {
        fill("white");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}


function generateRandomGrid(ylen, xlen) {
  let newGrid = [];
  for (let y = 0; y < ylen; y++) {
    let line = [];
    for (let x = 0; x < xlen; x++) {
      line.push(random() > 0.5);
    }
    newGrid.push(line);
  }
  return(newGrid);
}