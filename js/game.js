import { COLS, ROWS, SHAPES } from './tetrominoes.js';

export class Game {
    constructor() {
        this.reset();
    }

    reset() {
        this.grid = this.getEmptyGrid();
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.isGameOver = false;
        
        this.piece = null;
        this.nextPiece = this.generatePiece();
        this.spawnPiece();
    }

    getEmptyGrid() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    generatePiece() {
        const typeId = Math.floor(Math.random() * 7) + 1;
        const shape = SHAPES[typeId];
        return {
            typeId,
            shape,
            x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
            y: 0
        };
    }

    spawnPiece() {
        this.piece = this.nextPiece;
        this.nextPiece = this.generatePiece();

        if (this.collides(this.piece.x, this.piece.y, this.piece.shape)) {
            this.isGameOver = true;
        }
    }

    moveLeft() {
        if (!this.isGameOver && !this.collides(this.piece.x - 1, this.piece.y, this.piece.shape)) {
            this.piece.x -= 1;
            return true;
        }
        return false;
    }

    moveRight() {
        if (!this.isGameOver && !this.collides(this.piece.x + 1, this.piece.y, this.piece.shape)) {
            this.piece.x += 1;
            return true;
        }
        return false;
    }

    moveDown() {
        if (this.isGameOver) return false;
        
        if (!this.collides(this.piece.x, this.piece.y + 1, this.piece.shape)) {
            this.piece.y += 1;
            return true;
        } else {
            this.lockPiece();
            return false;
        }
    }

    hardDrop() {
        if (this.isGameOver) return;
        while (!this.collides(this.piece.x, this.piece.y + 1, this.piece.shape)) {
            this.piece.y += 1;
        }
        this.lockPiece();
    }

    rotate() {
        if (this.isGameOver) return;
        
        const matrix = this.piece.shape;
        const n = matrix.length;
        const rotated = Array.from({ length: n }, () => Array(n).fill(0));
        
        // Transpose and reverse
        for (let y = 0; y < n; ++y) {
            for (let x = 0; x < n; ++x) {
                rotated[x][n - 1 - y] = matrix[y][x];
            }
        }
        
        let kickX = 0;
        if (this.collides(this.piece.x, this.piece.y, rotated)) {
            if (!this.collides(this.piece.x + 1, this.piece.y, rotated)) {
                kickX = 1;
            } else if (!this.collides(this.piece.x - 1, this.piece.y, rotated)) {
                kickX = -1;
            } else if (!this.collides(this.piece.x - 2, this.piece.y, rotated)) {
                kickX = -2;
            } else if (!this.collides(this.piece.x + 2, this.piece.y, rotated)) {
                kickX = 2;
            } else {
                return; // Can't rotate
            }
        }
        
        this.piece.shape = rotated;
        this.piece.x += kickX;
    }

    getGhostPiece() {
        if (!this.piece || this.isGameOver) return null;
        let ghostY = this.piece.y;
        while (!this.collides(this.piece.x, ghostY + 1, this.piece.shape)) {
            ghostY++;
        }
        return {
            x: this.piece.x,
            y: ghostY,
            shape: this.piece.shape,
            typeId: this.piece.typeId
        };
    }

    collides(x, y, shape) {
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] === 0) continue;
                
                let newX = x + c;
                let newY = y + r;
                
                // Boundaries
                if (newX < 0 || newX >= COLS || newY >= ROWS) {
                    return true;
                }
                
                // Other blocks
                if (newY >= 0 && this.grid[newY][newX] !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    lockPiece() {
        for (let r = 0; r < this.piece.shape.length; r++) {
            for (let c = 0; c < this.piece.shape[r].length; c++) {
                if (this.piece.shape[r][c] !== 0) {
                    let newY = this.piece.y + r;
                    let newX = this.piece.x + c;
                    
                    if (newY < 0) {
                        this.isGameOver = true;
                        return;
                    }
                    this.grid[newY][newX] = this.piece.typeId;
                }
            }
        }
        this.clearLines();
        if (!this.isGameOver) {
            this.spawnPiece();
        }
    }

    clearLines() {
        let linesCleared = 0;
        
        for (let r = ROWS - 1; r >= 0; r--) {
            let isLineFull = true;
            for (let c = 0; c < COLS; c++) {
                if (this.grid[r][c] === 0) {
                    isLineFull = false;
                    break;
                }
            }
            
            if (isLineFull) {
                this.grid.splice(r, 1);
                this.grid.unshift(Array(COLS).fill(0));
                linesCleared++;
                r++; // Check the same row index again
            }
        }
        
        if (linesCleared > 0) {
            this.updateScore(linesCleared);
        }
    }

    updateScore(linesCleared) {
        this.lines += linesCleared;
        const linePoints = [0, 100, 300, 500, 800];
        this.score += linePoints[linesCleared] * this.level;
        
        if (this.lines >= this.level * 10) {
            this.level++;
        }
    }
}
