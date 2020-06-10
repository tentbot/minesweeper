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

    /* Determines the cell's appearance and renders it. */
    show() {
        let m, n;
        if (!this.clicked) {
            n = 0;
            m = this.flagged ? 1 : 0;
        } else if (!this.isMine) {
            n = 1;
            m = this.neighbours;
            if (this.neighbours === 0) {
                for (let xOff = -1; xOff <= 1; xOff++) {
                    let i = this.cols + xOff;
                    if (i < 0 || i >= cols)
                        continue;

                    for (let yOff = -1; yOff <= 1; yOff++) {
                        let j = this.rows + yOff;
                        if (j < 0 || j >= rows)
                            continue;

                        grid[i][j].clicked = true;
                    }
                }
            }
        } else {
            n = 2;
            m = 0;
        }
        image(sprites, RESOLUTION*n, RESOLUTION*m, RESOLUTION, RESOLUTION, this.x, this.y, this.step, this.step);
    }

    /* Counts the number of neighbours which are mines. */
    setNumber() {
        if (this.isMine) {
            this.neighbours = -1;
            return;
        }
        let total = 0;
        for (let xOff = -1; xOff <= 1; xOff++) {
            let i = this.cols + xOff;
            if (i < 0 || i >= cols)
                continue;

            for (let yOff = -1; yOff <= 1; yOff++) {
                let j = this.rows + yOff;
                if (j < 0 || j >= rows)
                    continue;
                if (grid[i][j].isMine) {
                    total++;
                }
            }
        }
        this.neighbours = total;
    }

    /* Triggered when the player left-clicks on this cell. */
    click() {
        if (mouseX > this.x && mouseX < this.x + this.step) {
            if (mouseY > this.y && mouseY < this.y + this.step) {
                if (!this.flagged) {
                    this.clicked = true;
                    if (this.isMine) {
                        gameOver = true;
                    }
                }
            }
        }
    }

    /* Triggered when the player right-clicks on this cell. */
    flag() {
        if (mouseX > this.x && mouseX < this.x + this.step) {
            if (mouseY > this.y && mouseY < this.y + this.step) {
                this.flagged = !this.flagged;
            }
        }
    }
}
