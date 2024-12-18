// Sierpinski Triangle


let initialTriangle;
let theColors = ["blue", "green", "yellow", "red", "orange", "teal", "pink"];


function setup() {
  createCanvas(windowWidth, windowHeight);
  initialTriangle = [
    {x:width / 2, y:50}, 
    {x:50, y:height - 50}, 
    {x:width - 50, y:height - 50}
  ];
}


function draw() {
  background(220);
  sierpinski(initialTriangle, 6);
}


function sierpinski(points, depth) {
  fill(theColors[depth]);
  triangle(points[0].x, points[0].y,
           points[1].x, points[1].y,
           points[2].x, points[2].y,);
  
  if (depth) {
    sierpinski([points[0],
      midpoint(points[0], points[1]),
      midpoint(points[0], points[2])],
      depth - 1);

    sierpinski([points[1],
      midpoint(points[1], points[0]),
      midpoint(points[1], points[2])],
      depth - 1);

    sierpinski([points[2],
      midpoint(points[2], points[0]),
      midpoint(points[2], points[1])],
      depth - 1);
  }
}

function midpoint(point1, point2) {
  let midX = (point1.x + point2.x) / 2 + (mouseX);
  let midY = (point1.y + point2.y) / 2 + (mouseY);
  return {x: midX, y: midY};
}
