import { COLS, ROWS, BLOCK_SIZE, COLORS } from './tetrominoes.js';
import { Game } from './game.js';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const nextCanvas = document.getElementById('next-piece');
const nextCtx = nextCanvas.getContext('2d');

const playBtn = document.getElementById('play-btn');
const retryBtn = document.getElementById('retry-btn');
const settingsBtn = document.getElementById('settings-btn');
const resumeBtn = document.getElementById('resume-btn');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');

const overlay = document.getElementById('game-overlay');
const overlayTitle = document.getElementById('overlay-title');
const startContent = document.getElementById('game-start-content');
const settingsContent = document.getElementById('settings-content');
const gameOverContent = document.getElementById('game-over-content');
const countdownOverlay = document.getElementById('countdown-overlay');
const countdownText = document.getElementById('countdown-text');

const scoreEl = document.getElementById('score');
const linesEl = document.getElementById('lines');
const levelEl = document.getElementById('level');
const finalScoreEl = document.getElementById('final-score');
const statTimeEl = document.getElementById('stat-time');

const playView = document.getElementById('play-view');
const statsView = document.getElementById('stats-view');
const awardsView = document.getElementById('awards-view');
const profileView = document.getElementById('profile-view');

const navPlay = document.getElementById('nav-play');
const navStats = document.getElementById('nav-stats');
const navAwards = document.getElementById('nav-awards');
const navProfile = document.getElementById('nav-profile');

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const sideMenu = document.getElementById('side-menu');
const sideMenuOverlay = document.getElementById('side-menu-overlay');

const ctrlLeft = document.getElementById('ctrl-left');
const ctrlRight = document.getElementById('ctrl-right');
const ctrlDown = document.getElementById('ctrl-down');
const ctrlRotate = document.getElementById('ctrl-rotate');

let game = new Game();
let requestId;
let isPaused = false;
let isCountingDown = false;
let startTime = 0;
let sessionStartTime = 0;
let totalSessionTime = 0; // seconds
let timeRecord = { start: 0, elapsed: 0, level: 1000 };

// Cumulative Stats (Local Storage)
let profileData = {
    totalScore: parseInt(localStorage.getItem('nk_totalScore')) || 0,
    totalGames: parseInt(localStorage.getItem('nk_totalGames')) || 0,
    totalTime: parseInt(localStorage.getItem('nk_totalTime')) || 0 // seconds
};

function saveProfile() {
    localStorage.setItem('nk_totalScore', profileData.totalScore.toString());
    localStorage.setItem('nk_totalGames', profileData.totalGames.toString());
    localStorage.setItem('nk_totalTime', profileData.totalTime.toString());
    updateProfileUI();
}

function updateProfileUI() {
    document.getElementById('profile-total-score').innerText = profileData.totalScore.toLocaleString();
    document.getElementById('profile-total-games').innerText = profileData.totalGames.toLocaleString();
    const hours = Math.floor(profileData.totalTime / 3600);
    const mins = Math.floor((profileData.totalTime % 3600) / 60);
    document.getElementById('profile-total-time').innerText = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

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
    context.beginPath();
    const radius = 4;
    context.roundRect(pxX + 1, pxY + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2, radius);
    context.fill();
    if (!isGhost) {
        context.strokeStyle = addAlpha(COLORS[colorId], 0.8);
        context.lineWidth = 2;
        context.stroke();
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

    const currentSessionSeconds = sessionStartTime ? Math.floor((Date.now() - sessionStartTime) / 1000) : 0;
    const m = Math.floor(currentSessionSeconds / 60).toString().padStart(2, '0');
    const s = (currentSessionSeconds % 60).toString().padStart(2, '0');
    statTimeEl.innerText = `${m}:${s}`;

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
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (game.grid[r][c] > 0) drawBlock(ctx, c, r, game.grid[r][c]);
        }
    }
    let ghost = game.getGhostPiece();
    if (ghost) {
        for (let r = 0; r < ghost.shape.length; r++) {
            for (let c = 0; c < ghost.shape[r].length; c++) {
                if (ghost.shape[r][c] > 0) drawBlock(ctx, ghost.x + c, ghost.y + r, ghost.typeId, true);
            }
        }
    }
    if (game.piece) {
        for (let r = 0; r < game.piece.shape.length; r++) {
            for (let c = 0; c < game.piece.shape[r].length; c++) {
                if (game.piece.shape[r][c] > 0) drawBlock(ctx, game.piece.x + c, game.piece.y + r, game.piece.typeId);
            }
        }
    }
    if (game.nextPiece) {
        const shape = game.nextPiece.shape;
        const wOffset = (4 - shape[0].length) / 2;
        const hOffset = (4 - shape.length) / 2;
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] > 0) drawBlock(nextCtx, c + wOffset, r + hOffset, game.nextPiece.typeId);
            }
        }
    }
    updateStats();
}

function animate(now = 0) {
    if (isPaused || isCountingDown) return;
    if (now - timeRecord.start > timeRecord.level) {
        timeRecord.start = now;
        game.moveDown();
    }
    timeRecord.level = Math.max(100, 1000 - (game.level * 60)); 
    draw();
    if (game.isGameOver) {
        showGameOver();
        return;
    }
    requestId = requestAnimationFrame(animate);
}

function showGameOver() {
    cancelAnimationFrame(requestId);
    profileData.totalScore += game.score;
    profileData.totalGames += 1;
    profileData.totalTime += Math.floor((Date.now() - sessionStartTime) / 1000);
    saveProfile();

    startContent.classList.add('hidden');
    settingsContent.classList.add('hidden');
    gameOverContent.classList.remove('hidden');
    finalScoreEl.innerText = game.score.toLocaleString();
    overlay.classList.remove('hidden');
}

function init() {
    isPaused = false;
    isCountingDown = false;
    game.reset();
    timeRecord.start = performance.now();
    sessionStartTime = Date.now();
    if (requestId) cancelAnimationFrame(requestId);
    overlay.classList.add('hidden');
    switchView('play');
    animate();
}

function openSettings() {
    if (game.isGameOver || isCountingDown) return;
    isPaused = true;
    cancelAnimationFrame(requestId);
    startContent.classList.add('hidden');
    gameOverContent.classList.add('hidden');
    settingsContent.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function startCountdown(callback) {
    isCountingDown = true;
    overlay.classList.add('hidden');
    countdownOverlay.classList.remove('hidden');
    let count = 3;
    countdownText.innerText = count;
    
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownText.innerText = count;
        } else {
            clearInterval(interval);
            countdownOverlay.classList.add('hidden');
            isCountingDown = false;
            callback();
        }
    }, 1000);
}

function resumeGame() {
    startCountdown(() => {
        isPaused = false;
        timeRecord.start = performance.now();
        // Since we resumed, we need to adjust sessionStartTime if we want precise playtime tracking, 
        // but for now simple Date.now() logic works well enough.
        animate();
    });
}

function openMenu() {
    sideMenu.classList.add('open');
    sideMenuOverlay.classList.remove('hidden');
    setTimeout(() => sideMenuOverlay.classList.add('show'), 10);
}

function closeMenu() {
    sideMenu.classList.remove('open');
    sideMenuOverlay.classList.remove('show');
    setTimeout(() => sideMenuOverlay.classList.add('hidden'), 300);
}

function switchView(viewName) {
    [playView, statsView, awardsView, profileView].forEach(v => v.classList.add('hidden'));
    [navPlay, navStats, navAwards, navProfile].forEach(n => n.classList.remove('active'));

    if (viewName === 'play') {
        playView.classList.remove('hidden');
        navPlay.classList.add('active');
    } else if (viewName === 'stats') {
        statsView.classList.remove('hidden');
        navStats.classList.add('active');
        updateStats();
    } else if (viewName === 'awards') {
        awardsView.classList.remove('hidden');
        navAwards.classList.add('active');
    } else if (viewName === 'profile') {
        profileView.classList.remove('hidden');
        navProfile.classList.add('active');
        updateProfileUI();
    }
    closeMenu();
}

// Event Listeners
playBtn.addEventListener('click', init);
retryBtn.addEventListener('click', init);
settingsBtn.addEventListener('click', openSettings);
resumeBtn.addEventListener('click', resumeGame);
restartBtn.addEventListener('click', init);
homeBtn.addEventListener('click', () => {
    isPaused = true;
    cancelAnimationFrame(requestId);
    overlay.classList.remove('hidden');
    startContent.classList.remove('hidden');
    settingsContent.classList.add('hidden');
    gameOverContent.classList.add('hidden');
    overlayTitle.innerText = "TETRIS";
    switchView('play');
});

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
sideMenuOverlay.addEventListener('click', closeMenu);

navPlay.addEventListener('click', () => switchView('play'));
navStats.addEventListener('click', () => switchView('stats'));
navAwards.addEventListener('click', () => switchView('awards'));
navProfile.addEventListener('click', () => switchView('profile'));

// Control Hold Logic (Hard Drop)
let holdTimer;
const HOLD_THRESHOLD = 1000;

function startHold() {
    if (isPaused || isCountingDown || game.isGameOver) return;
    holdTimer = setTimeout(() => {
        game.hardDrop();
        draw();
        holdTimer = null;
    }, HOLD_THRESHOLD);
}

function endHold() {
    if (holdTimer) {
        clearTimeout(holdTimer);
        game.moveDown();
        draw();
        holdTimer = null;
    }
}

ctrlLeft.addEventListener('click', () => { if (!isPaused && !isCountingDown && !game.isGameOver) { game.moveLeft(); draw(); } });
ctrlRight.addEventListener('click', () => { if (!isPaused && !isCountingDown && !game.isGameOver) { game.moveRight(); draw(); } });
ctrlRotate.addEventListener('click', () => { if (!isPaused && !isCountingDown && !game.isGameOver) { game.rotate(); draw(); } });

// Down Button with Hold logic
ctrlDown.addEventListener('mousedown', startHold);
ctrlDown.addEventListener('mouseup', endHold);
ctrlDown.addEventListener('touchstart', (e) => { e.preventDefault(); startHold(); });
ctrlDown.addEventListener('touchend', (e) => { e.preventDefault(); endHold(); });

document.addEventListener('keydown', (e) => {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
    if (e.key === 'p' || e.key === 'P') { togglePause(); return; }
    if (isPaused || isCountingDown || game.isGameOver) return;
    if (e.code === 'ArrowLeft') { game.moveLeft(); draw(); }
    else if (e.code === 'ArrowRight') { game.moveRight(); draw(); }
    else if (e.code === 'ArrowDown') { game.moveDown(); draw(); }
    else if (e.code === 'ArrowUp') { game.rotate(); draw(); }
    else if (e.code === 'Space') { game.hardDrop(); draw(); }
});

updateProfileUI();
draw();
