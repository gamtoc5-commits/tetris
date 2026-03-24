import { COLS, ROWS, BLOCK_SIZE, COLORS } from './tetrominoes.js';
import { Game } from './game.js';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const nextCanvas = document.getElementById('next-piece');
const nextCtx = nextCanvas.getContext('2d');

const playBtn = document.getElementById('play-btn');
const overlay = document.getElementById('game-overlay');
const scoreEl = document.getElementById('score');
const linesEl = document.getElementById('lines');
const levelEl = document.getElementById('level');
const titleEl = document.getElementById('overlay-title');

let game = new Game();
let requestId;
let isPaused = false;
let time = { start: 0, elapsed: 0, level: 1000 };

function addAlpha(hexColor, alpha) {
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawBlock(context, x, y, colorId, isGhost = false) {
    if (colorId === 0) return;
    
    const pxX = x * BLOCK_SIZE;
    const pxY = y * BLOCK_SIZE;

    context.fillStyle = isGhost ? addAlpha(COLORS[colorId], 0.2) : COLORS[colorId];
    context.fillRect(pxX, pxY, BLOCK_SIZE, BLOCK_SIZE);
    
    if (!isGhost) {
        context.fillStyle = 'rgba(255, 255, 255, 0.4)';
        context.fillRect(pxX, pxY, BLOCK_SIZE, 4); 
        context.fillRect(pxX, pxY, 4, BLOCK_SIZE); 
        
        context.fillStyle = 'rgba(0, 0, 0, 0.4)';
        context.fillRect(pxX, pxY + BLOCK_SIZE - 4, BLOCK_SIZE, 4); 
        context.fillRect(pxX + BLOCK_SIZE - 4, pxY, 4, BLOCK_SIZE); 
    } else {
        context.strokeStyle = COLORS[colorId];
        context.lineWidth = 1;
        context.strokeRect(pxX + 0.5, pxY + 0.5, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
    }
}

function drawGrid(context, rows, cols) {
    context.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    context.lineWidth = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            context.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);

    drawGrid(ctx, ROWS, COLS);

    // Draw board
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (game.grid[r][c] > 0) {
                drawBlock(ctx, c, r, game.grid[r][c]);
            }
        }
    }

    // Draw Ghost
    let ghost = game.getGhostPiece();
    if (ghost) {
        for (let r = 0; r < ghost.shape.length; r++) {
            for (let c = 0; c < ghost.shape[r].length; c++) {
                if (ghost.shape[r][c] > 0) {
                    drawBlock(ctx, ghost.x + c, ghost.y + r, ghost.typeId, true);
                }
            }
        }
    }

    // Draw Active Piece
    if (game.piece) {
        for (let r = 0; r < game.piece.shape.length; r++) {
            for (let c = 0; c < game.piece.shape[r].length; c++) {
                if (game.piece.shape[r][c] > 0) {
                    drawBlock(ctx, game.piece.x + c, game.piece.y + r, game.piece.typeId);
                }
            }
        }
    }
    
    // Draw Next Piece
    if (game.nextPiece) {
        const shape = game.nextPiece.shape;
        const wOffset = (4 - shape[0].length) / 2;
        const hOffset = (4 - shape.length) / 2;
        
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] > 0) {
                    drawBlock(nextCtx, c + wOffset, r + hOffset, game.nextPiece.typeId);
                }
            }
        }
    }

    scoreEl.innerText = game.score;
    linesEl.innerText = game.lines;
    levelEl.innerText = game.level;
}

function animate(now = 0) {
    if (isPaused) return;

    if (now - time.start > time.level) {
        time.start = now;
        game.moveDown();
    }
    
    // Set drop speed faster as level goes up maxing out at level 15 (100ms)
    time.level = Math.max(100, 1000 - (game.level * 60)); 
    
    draw();
    
    if (game.isGameOver) {
        cancelAnimationFrame(requestId);
        titleEl.innerText = 'GAME OVER';
        playBtn.innerText = 'PLAY AGAIN';
        overlay.classList.remove('hidden');
        return;
    }

    requestId = requestAnimationFrame(animate);
}

function init() {
    isPaused = false;
    game.reset();
    time.start = performance.now();
    if (requestId) cancelAnimationFrame(requestId);
    animate();
}

function togglePause() {
    if (game.isGameOver) return;
    isPaused = !isPaused;
    
    if (isPaused) {
        cancelAnimationFrame(requestId);
        titleEl.innerText = 'PAUSED';
        playBtn.innerText = 'RESUME';
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
        time.start = performance.now();
        animate();
    }
}

playBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    if (isPaused) {
        togglePause(); // Unpause by clicking resume
    } else {
        init(); // Starts a new game
    }
    canvas.focus();
});

document.addEventListener('keydown', (e) => {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
    }

    if (e.key === 'p' || e.key === 'P') {
        togglePause();
        return;
    }

    if (isPaused || game.isGameOver) return;

    if (e.code === 'ArrowLeft') {
        game.moveLeft();
        draw();
    } else if (e.code === 'ArrowRight') {
        game.moveRight();
        draw();
    } else if (e.code === 'ArrowDown') {
        game.moveDown();
        draw();
    } else if (e.code === 'ArrowUp') {
        game.rotate();
        draw();
    } else if (e.code === 'Space') {
        game.hardDrop();
        draw();
    }
});

// Initial draw of static boards before game starts
draw();
