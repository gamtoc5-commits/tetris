import { COLS, ROWS, BLOCK_SIZE, COLORS } from './tetrominoes.js';
import { Game } from './game.js';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const nextCanvas = document.getElementById('next-piece');
const nextCtx = nextCanvas.getContext('2d');

const playBtn = document.getElementById('play-btn');
const retryBtn = document.getElementById('retry-btn');
const overlay = document.getElementById('game-overlay');
const scoreEl = document.getElementById('score');
const linesEl = document.getElementById('lines');
const levelEl = document.getElementById('level');
const overlayTitle = document.getElementById('overlay-title');

// New UI Elements for GameOver and Stats
const startContent = document.getElementById('game-start-content');
const gameOverContent = document.getElementById('game-over-content');
const finalScoreEl = document.getElementById('final-score');

const playView = document.getElementById('play-view');
const statsView = document.getElementById('stats-view');
const navPlay = document.getElementById('nav-play');
const navStats = document.getElementById('nav-stats');

// On-screen controls
const ctrlLeft = document.getElementById('ctrl-left');
const ctrlRight = document.getElementById('ctrl-right');
const ctrlDown = document.getElementById('ctrl-down');
const ctrlRotate = document.getElementById('ctrl-rotate');

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
    
    // Draw block with rounded corners simulation if possible, or just keep it simple but clean
    context.beginPath();
    const radius = 4;
    context.roundRect(pxX + 1, pxY + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2, radius);
    context.fill();
    
    if (!isGhost) {
        // Neon edge 
        context.strokeStyle = addAlpha(COLORS[colorId], 0.8);
        context.lineWidth = 2;
        context.stroke();
        
        // Subtle highlight
        context.fillStyle = 'rgba(255, 255, 255, 0.15)';
        context.fillRect(pxX + 4, pxY + 4, BLOCK_SIZE - 8, 4);
    } else {
        context.strokeStyle = COLORS[colorId];
        context.lineWidth = 1;
        context.stroke();
    }
}

function drawGrid(context, rows, cols) {
    context.strokeStyle = 'rgba(185, 159, 255, 0.03)';
    context.lineWidth = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            context.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }
}

function updateStats() {
    scoreEl.innerText = game.score.toLocaleString();
    linesEl.innerText = game.lines;
    levelEl.innerText = game.level;

    // Update Stats View if visible
    if (!statsView.classList.contains('hidden')) {
        document.querySelector('.stat-score').innerText = game.score.toLocaleString();
        document.querySelector('.stat-lines').innerText = game.lines;
        document.querySelector('.stat-level').innerText = game.level;
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

    updateStats();
}

function animate(now = 0) {
    if (isPaused) return;

    if (now - time.start > time.level) {
        time.start = now;
        game.moveDown();
    }
    
    time.level = Math.max(100, 1000 - (game.level * 60)); 
    
    draw();
    
    if (game.isGameOver) {
        showGameOver();
        return;
    }

    requestId = requestAnimationFrame(animate);
}

function showGameOver() {
    cancelAnimationFrame(requestId);
    startContent.classList.add('hidden');
    gameOverContent.classList.remove('hidden');
    finalScoreEl.innerText = game.score.toLocaleString();
    overlay.classList.remove('hidden');
}

function init() {
    isPaused = false;
    game.reset();
    time.start = performance.now();
    if (requestId) cancelAnimationFrame(requestId);
    overlay.classList.add('hidden');
    animate();
}

function togglePause() {
    if (game.isGameOver) return;
    isPaused = !isPaused;
    
    if (isPaused) {
        cancelAnimationFrame(requestId);
        overlayTitle.innerText = 'PAUSED';
        playBtn.innerText = 'RESUME SESSION';
        startContent.classList.remove('hidden');
        gameOverContent.classList.add('hidden');
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
        time.start = performance.now();
        animate();
    }
}

// Event Listeners
playBtn.addEventListener('click', () => {
    if (isPaused) {
        togglePause();
    } else {
        init();
    }
});

retryBtn.addEventListener('click', () => {
    init();
});

// View Switching
navPlay.addEventListener('click', (e) => {
    e.preventDefault();
    playView.classList.remove('hidden');
    statsView.classList.add('hidden');
    navPlay.classList.add('active');
    navStats.classList.remove('active');
});

navStats.addEventListener('click', (e) => {
    e.preventDefault();
    playView.classList.add('hidden');
    statsView.classList.remove('hidden');
    navPlay.classList.remove('active');
    navStats.classList.add('active');
    updateStats(); // Refresh stats view
});

// On-screen Controls
ctrlLeft.addEventListener('click', () => { if (!isPaused && !game.isGameOver) { game.moveLeft(); draw(); } });
ctrlRight.addEventListener('click', () => { if (!isPaused && !game.isGameOver) { game.moveRight(); draw(); } });
ctrlDown.addEventListener('click', () => { if (!isPaused && !game.isGameOver) { game.moveDown(); draw(); } });
ctrlRotate.addEventListener('click', () => { if (!isPaused && !game.isGameOver) { game.rotate(); draw(); } });

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

// Initial state
navPlay.classList.add('active');
draw();
document.querySelector('.stat-high-score').innerText = "0"; // Placeholder
