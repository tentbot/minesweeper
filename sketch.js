let grid = [];
let cols;
let rows;
let sprites;
let gameOver = false;
const step = 30;
const difficulty = 1.15;
const RESOLUTION = 28;

function preload() {
    sprites = loadImage("resources/sprites.png");
}

function setup() {
    createCanvas(600, 600);
    newGame();
}

function draw() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
    
    if (gameOver) {
        let win = checkWin();
        if (win) {
            if (confirm("You won!\n\nWould you like to play again?")) {
                newGame();
            }
        } else {
            if (confirm("You lose!\n\nWould you like to play again?")) {
                newGame();
            }
        }
    }
}

function newGame() {
    gameOver = false;
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

function checkWin() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (!grid[i][j].clicked && !grid[i][j].isMine) {
                continue;
            } else if (grid[i][j].clicked && grid[i][j].isMine) {
                return false;
            }
        }
    }
    return true;
}

function mousePressed() {
    if (mouseButton === LEFT) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].click();
            }
        }
    } else if (mouseButton === RIGHT) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].flag();
            }
        }
    }
}
