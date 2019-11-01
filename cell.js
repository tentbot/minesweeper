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

    /**
     * Determines the cell's appearance and renders it.
     */
    show() {
        if (!this.clicked) {
            rect(this.x, this.y, this.step, this.step);
            if (this.flagged) {
                image(flag, this.x, this.y, this.step, this.step);
            }
        } else if (!this.isMine) {
            if (this.neighbours === 0) {
                for (let xOff = -1; xOff <= 1; xOff++) {
                    let i = this.cols + xOff;
                    if (i < 0 || i >= cols) continue;

                    for (let yOff = -1; yOff <= 1; yOff++) {
                        let j = this.rows + yOff;
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

    /**
     * Counts the number of neighbours which are mines.
     */
    setNumber() {
        if (this.isMine) {
            this.neighbours = -1;
            return;
        }
        let total = 0;
        for (let xOff = -1; xOff <= 1; xOff++) {
            let i = this.cols + xOff;
            if (i < 0 || i >= cols) continue;

            for (let yOff = -1; yOff <= 1; yOff++) {
                let j = this.rows + yOff;
                if (j < 0 || j >= rows) continue;
                //let neighbour = grid[i][j];
                if (grid[i][j].isMine) {
                    total++;
                }
            }
        }
        this.neighbours = total;
    }

    /**
     * Triggered when the player left-clicks on this cell.
     */
    mousePressed() {
        if (mouseX > this.x && mouseX < this.x + this.step) {
            if (mouseY > this.y && mouseY < this.y + this.step) {
                if (!this.flagged) {
                    this.clicked = true;
                    if (this.isMine) {
                        for (let i = 0; i < cols; i++) {
                            for (let j = 0; j < rows; j++) {
                                grid[i][j].clicked = true;
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Triggered when the player right-clicks on this cell.
     */
    flag() {
        if (mouseX > this.x && mouseX < this.x + this.step) {
            if (mouseY > this.y && mouseY < this.y + this.step) {
                this.flagged = !this.flagged;
            }
        }
    }
}
