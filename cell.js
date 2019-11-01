class Cell {
    constructor(x, y, step, mine) {
        this.cols = x;
        this.rows = y;
        this.step = step;
        this.x = x * step;
        this.y = y * step;
        this.isMine = mine;
        this.clicked = false;
        this.neighbours = 0;
        this.flagged = false;
    }

    show() { //Draws the cell for the mine
        if (!this.clicked) { //Normal Cell
            rect(this.x, this.y, this.step, this.step);
            if (this.flagged) {
                image(flag, this.x, this.y, this.step, this.step);
            }
        } else if (!this.isMine) {
            if (this.neighbours === 0) {
                for (var xOff = -1; xOff <= 1; xOff++) {
                    var i = this.cols + xOff;
                    if (i < 0 || i >= cols) continue;

                    for (var yOff = -1; yOff <= 1; yOff++) {
                        var j = this.rows + yOff;
                        if (j < 0 || j >= rows) continue;

                        grid[i][j].clicked = true;

                        if (grid[i][j].neighbours === 0) {
                            grid[i][j].clicked = true;
                        }
                    }
                }
            }
            fill(0, 0, 255);
            textSize(20);
            textAlign("center");
            text(this.neighbours, this.x + this.step / 2, this.y + this.step / 1.35);
            fill(255);
        } else if (this.isMine) {
            fill(0);
            ellipse(this.x + 15, this.y + 15, this.step / 2);
            fill(255);
        }
    }

    setNumber() { //Sets the number for each cell
        if (this.isMine) {
            this.neighbours = -1;
            return;
        }
        var total = 0;
        for (var xOff = -1; xOff <= 1; xOff++) {
            var i = this.cols + xOff;
            if (i < 0 || i >= cols) continue;

            for (var yOff = -1; yOff <= 1; yOff++) {
                var j = this.rows + yOff;
                if (j < 0 || j >= rows) continue;

                //var neighbour = grid[i][j];
                if (grid[i][j].isMine) {
                    total++;
                }
            }
        }
        this.neighbours = total;
    }

    mousePressed() {
        if (mouseX > this.x && mouseX < this.x + this.step) {
            if (mouseY > this.y && mouseY < this.y + this.step) {
                this.clicked = true;
                if (this.isMine) {
                    for (var i = 0; i < cols; i++) {
                        for (var j = 0; j < rows; j++) {
                            grid[i][j].clicked = true;
                        }
                    }
                }
            }
        }
    }

    flag() {
        if (mouseX > this.x && mouseX < this.x + this.step) {
            if (mouseY > this.y && mouseY < this.y + this.step) {
                this.flagged = true;
               
            }
        }
    }
}
