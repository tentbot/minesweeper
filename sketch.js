var grid = [];
var cols;
var rows;
var step = 30;
var difficulty = 1.2;

function setup() {
    flag  = loadImage("flag.png");
    createCanvas(600, 600);
    cols = floor(width / step);
    rows = floor(height / step);
    for (var i = 0; i < cols; i++) {
        grid[i] = [];
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, step, floor(random(1) * difficulty));
        }
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].setNumber();
        }
    }
}



function draw() {
    background(245);
    stroke(150);
    strokeWeight(4);
    fill(255);
    image(flag, mouseX, mouseY);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}


function mousePressed() {
    if (mouseButton === LEFT) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                grid[i][j].mousePressed();
            }
        }
    }

    if (mouseButton === RIGHT) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                grid[i][j].flag();
            }
        }
    }
}
