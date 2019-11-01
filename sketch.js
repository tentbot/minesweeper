let grid = [];
let cols;
let rows;
let flag;
const step = 30;
const difficulty = 1.2;

function preload() {
    flag = loadImage("Flag.png");
}

function setup() {
    createCanvas(600, 600);
    cols = floor(width / step);
    rows = floor(height / step);
    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, step, floor(random(1) * difficulty));
        }
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
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
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}


function mousePressed() {
    if (mouseButton === LEFT) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].mousePressed();
            }
        }
    }

    if (mouseButton === RIGHT) {
        console.log("Flag");
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].flag();
            }
        }
    }
}
