let grid = [];
let cols;
let rows;
let flag;
let gameOver = false;
const step = 30;
const difficulty = 1.15;

function preload() {
    flag = loadImage("Flag.png");
}

function setup() {
    gameOver = false;
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
    if (!gameOver) {
        let result = checkGameOver();
        if (result == "WIN") {
            gameOver = true;
            if (confirm("You won!\n\nWould you like to play again?")) {
                setup();
            }
        } else if (result == "LOSE" && !gameOver) {
            gameOver = true;
            if (confirm("You lose!\n\nWould you like to play again?")) {
                setup();
            }
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

function checkGameOver() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (!grid[i][j].clicked && !grid[i][j].isMine) {
                return;
            } else if (grid[i][j].clicked && grid[i][j].isMine) {
                return "LOSE";
            }
        }
    }
    return "WIN";
}
