// Rectangle Grid
// 2d array demo

const CELL_SIZE_Y = 30;
const CELL_SIZE_X = 30;
let grid, rows, cols;

let color1, color2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.ceil(width / CELL_SIZE_X);
  rows = Math.ceil(height / CELL_SIZE_Y);
  grid = generateRandomGrid(cols, rows);
  noStroke();

  color1 = color(random(255), random(255), random(255));
  color2 = color(random(255), random(255), random(255));
}


function draw() {
  background(220);
  drawGrid(grid);
}


function drawGrid(grid) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x]) {
        fill(color1);
      } 
      else {
        fill(color2);
      }
      
      rect(x * CELL_SIZE_X, y *CELL_SIZE_Y, CELL_SIZE_X, CELL_SIZE_Y);
    }
  }
}


function generateRandomGrid() {
  let newGrid = [];
  
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y][x] = random() > 0.5;
    }
  }

  return newGrid;
}