import { COLS, ROWS, BLOCK_SIZE, COLORS } from './tetrominoes.js';
import { Game } from './game.js';

// DOM Element Selectors with explicit null handling for reliability
const getEl = (id) => document.getElementById(id);

const canvas = getEl('board');
const ctx = canvas ? canvas.getContext('2d') : null;
const nextCanvas = getEl('next-piece');
const nextCtx = nextCanvas ? nextCanvas.getContext('2d') : null;

const playBtn = getEl('play-btn');
const retryBtn = getEl('retry-btn');
const settingsBtn = getEl('settings-btn');
const resumeBtn = getEl('resume-btn');
const restartBtn = getEl('restart-btn');
const homeBtn = getEl('home-btn');

const overlay = getEl('game-overlay');
const overlayTitle = getEl('overlay-title');
const startContent = getEl('game-start-content');
const settingsContent = getEl('settings-content');
const gameOverContent = getEl('game-over-content');
const countdownOverlay = getEl('countdown-overlay');
const countdownText = getEl('countdown-text');

const scoreEl = getEl('score');
const linesEl = getEl('lines');
const levelEl = getEl('level');
const finalScoreEl = getEl('final-score');
const statTimeEl = getEl('stat-time');

const playView = getEl('play-view');
const statsView = getEl('stats-view');
const awardsView = getEl('awards-view');
const profileView = getEl('profile-view');

const navPlay = getEl('nav-play');
const navStats = getEl('nav-stats');
const navAwards = getEl('nav-awards');
const navProfile = getEl('nav-profile');

const menuToggle = getEl('menu-toggle');
const menuClose = getEl('menu-close');
const sideMenu = getEl('side-menu');
const sideMenuOverlay = getEl('side-menu-overlay');

const ctrlLeft = getEl('ctrl-left');
const ctrlRight = getEl('ctrl-right');
const ctrlDown = getEl('ctrl-down');
const ctrlRotate = getEl('ctrl-rotate');

let game = new Game();
let requestId;
let isPaused = false;
let isCountingDown = false;
let sessionStartTime = 0;
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
    const ts = getEl('profile-total-score');
    const tg = getEl('profile-total-games');
    const tt = getEl('profile-total-time');
    if (ts) ts.innerText = profileData.totalScore.toLocaleString();
    if (tg) tg.innerText = profileData.totalGames.toLocaleString();
    if (tt) {
        const hours = Math.floor(profileData.totalTime / 3600);
        const mins = Math.floor((profileData.totalTime % 3600) / 60);
        tt.innerText = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    }
}

function addAlpha(hexColor, alpha) {
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawBlock(context, x, y, colorId, isGhost = false) {
    if (!context || colorId === 0) return;
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
    if (!context) return;
    context.strokeStyle = 'rgba(185, 159, 255, 0.03)';
    context.lineWidth = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            context.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }
}

function updateStats() {
    if (scoreEl) scoreEl.innerText = game.score.toLocaleString();
    if (linesEl) linesEl.innerText = game.lines;
    if (levelEl) levelEl.innerText = game.level;

    if (statTimeEl) {
        const currentSessionSeconds = sessionStartTime ? Math.floor((Date.now() - sessionStartTime) / 1000) : 0;
        const m = Math.floor(currentSessionSeconds / 60).toString().padStart(2, '0');
        const s = (currentSessionSeconds % 60).toString().padStart(2, '0');
        statTimeEl.innerText = `${m}:${s}`;
    }

    // Safety checks for stat view elements
    const sScore = document.querySelector('.stat-score');
    const sLines = document.querySelector('.stat-lines');
    const sLevel = document.querySelector('.stat-level');
    if (sScore) sScore.innerText = game.score.toLocaleString();
    if (sLines) sLines.innerText = game.lines;
    if (sLevel) sLevel.innerText = game.level;
}

function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (nextCtx) nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
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
    if (game.nextPiece && nextCtx) {
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

    if (startContent) startContent.classList.add('hidden');
    if (settingsContent) settingsContent.classList.add('hidden');
    if (gameOverContent) gameOverContent.classList.remove('hidden');
    if (finalScoreEl) finalScoreEl.innerText = game.score.toLocaleString();
    if (overlay) overlay.classList.remove('hidden');
}

function init() {
    isPaused = false;
    isCountingDown = false;
    game.reset();
    timeRecord.start = performance.now();
    sessionStartTime = Date.now();
    if (requestId) cancelAnimationFrame(requestId);
    if (overlay) overlay.classList.add('hidden');
    switchView('play');
    animate();
}

function openSettings() {
    if (game.isGameOver || isCountingDown) return;
    isPaused = true;
    cancelAnimationFrame(requestId);
    if (startContent) startContent.classList.add('hidden');
    if (gameOverContent) gameOverContent.classList.add('hidden');
    if (settingsContent) settingsContent.classList.remove('hidden');
    if (overlay) overlay.classList.remove('hidden');
}

function startCountdown(callback) {
    isCountingDown = true;
    if (overlay) overlay.classList.add('hidden');
    if (countdownOverlay) countdownOverlay.classList.remove('hidden');
    let count = 3;
    if (countdownText) countdownText.innerText = count;
    
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            if (countdownText) countdownText.innerText = count;
        } else {
            clearInterval(interval);
            if (countdownOverlay) countdownOverlay.classList.add('hidden');
            isCountingDown = false;
            callback();
        }
    }, 1000);
}

function resumeGame() {
    startCountdown(() => {
        isPaused = false;
        timeRecord.start = performance.now();
        animate();
    });
}

function openMenu() {
    if (sideMenu) sideMenu.classList.add('open');
    if (sideMenuOverlay) {
        sideMenuOverlay.classList.remove('hidden');
        setTimeout(() => sideMenuOverlay.classList.add('show'), 10);
    }
}

function closeMenu() {
    if (sideMenu) sideMenu.classList.remove('open');
    if (sideMenuOverlay) {
        sideMenuOverlay.classList.remove('show');
        setTimeout(() => sideMenuOverlay.classList.add('hidden'), 300);
    }
}

function switchView(viewName) {
    // Collect views and navs that are NOT null to avoid classList errors
    const views = [playView, statsView, awardsView, profileView].filter(v => v !== null);
    const navs = [navPlay, navStats, navAwards, navProfile].filter(n => n !== null);

    views.forEach(v => v.classList.add('hidden'));
    navs.forEach(n => n.classList.remove('active'));

    if (viewName === 'play' && playView) {
        playView.classList.remove('hidden');
        if (navPlay) navPlay.classList.add('active');
    } else if (viewName === 'stats' && statsView) {
        statsView.classList.remove('hidden');
        if (navStats) navStats.classList.add('active');
        updateStats();
    } else if (viewName === 'awards' && awardsView) {
        awardsView.classList.remove('hidden');
        if (navAwards) navAwards.classList.add('active');
    } else if (viewName === 'profile' && profileView) {
        profileView.classList.remove('hidden');
        if (navProfile) navProfile.classList.add('active');
        updateProfileUI();
    }
    closeMenu();
}

// Event Listeners with null safety
if (playBtn) playBtn.addEventListener('click', init);
if (retryBtn) retryBtn.addEventListener('click', init);
if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
if (resumeBtn) resumeBtn.addEventListener('click', resumeGame);
if (restartBtn) restartBtn.addEventListener('click', init);
if (homeBtn) homeBtn.addEventListener('click', () => {
    isPaused = true;
    cancelAnimationFrame(requestId);
    if (overlay) overlay.classList.remove('hidden');
    if (startContent) startContent.classList.remove('hidden');
    if (settingsContent) settingsContent.classList.add('hidden');
    if (gameOverContent) gameOverContent.classList.add('hidden');
    if (overlayTitle) overlayTitle.innerText = "TETRIS";
    switchView('play');
});

if (menuToggle) menuToggle.addEventListener('click', openMenu);
if (menuClose) menuClose.addEventListener('click', closeMenu);
if (sideMenuOverlay) sideMenuOverlay.addEventListener('click', closeMenu);

if (navPlay) navPlay.addEventListener('click', () => switchView('play'));
if (navStats) navStats.addEventListener('click', () => switchView('stats'));
if (navAwards) navAwards.addEventListener('click', () => switchView('awards'));
if (navProfile) navProfile.addEventListener('click', () => switchView('profile'));

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

if (ctrlLeft) ctrlLeft.addEventListener('click', () => { if (!isPaused && !isCountingDown && !game.isGameOver) { game.moveLeft(); draw(); } });
if (ctrlRight) ctrlRight.addEventListener('click', () => { if (!isPaused && !isCountingDown && !game.isGameOver) { game.moveRight(); draw(); } });
if (ctrlRotate) ctrlRotate.addEventListener('click', () => { if (!isPaused && !isCountingDown && !game.isGameOver) { game.rotate(); draw(); } });

// Down Button with Hold logic
if (ctrlDown) {
    ctrlDown.addEventListener('mousedown', startHold);
    ctrlDown.addEventListener('mouseup', endHold);
    ctrlDown.addEventListener('touchstart', (e) => { e.preventDefault(); startHold(); });
    ctrlDown.addEventListener('touchend', (e) => { e.preventDefault(); endHold(); });
}

document.addEventListener('keydown', (e) => {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
    if (e.key === 'p' || e.key === 'P') { 
        if (isPaused) resumeGame(); else openSettings();
        return; 
    }
    if (isPaused || isCountingDown || game.isGameOver) return;
    if (e.code === 'ArrowLeft') { game.moveLeft(); draw(); }
    else if (e.code === 'ArrowRight') { game.moveRight(); draw(); }
    else if (e.code === 'ArrowDown') { game.moveDown(); draw(); }
    else if (e.code === 'ArrowUp') { game.rotate(); draw(); }
    else if (e.code === 'Space') { game.hardDrop(); draw(); }
});

updateProfileUI();
draw();
// Final assurance that play view is visible
switchView('play');
