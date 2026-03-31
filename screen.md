<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>NEON KINETIC - Tetris</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;family=Be+Vietnam+Pro:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "on-secondary-fixed-variant": "#005964",
                        "tertiary-container": "#fe00fe",
                        "tertiary": "#ff51fa",
                        "error-container": "#a70138",
                        "secondary-fixed": "#26e6ff",
                        "secondary": "#00e3fd",
                        "on-secondary": "#004d57",
                        "background": "#140727",
                        "on-error": "#490013",
                        "error": "#ff6e84",
                        "on-secondary-fixed": "#003a42",
                        "inverse-primary": "#6f26f6",
                        "surface-container-high": "#271641",
                        "secondary-fixed-dim": "#00d7f0",
                        "surface-variant": "#2e1c4b",
                        "primary-fixed-dim": "#a17cff",
                        "on-tertiary-container": "#230023",
                        "surface-container": "#201139",
                        "error-dim": "#d73357",
                        "surface-container-highest": "#2e1c4b",
                        "surface-container-low": "#190b30",
                        "surface-bright": "#352254",
                        "tertiary-fixed": "#ff81f5",
                        "on-surface-variant": "#b5a4cd",
                        "outline": "#7e6f95",
                        "on-primary-fixed": "#000000",
                        "on-primary-fixed-variant": "#350087",
                        "on-tertiary-fixed": "#320032",
                        "primary-fixed": "#ad8eff",
                        "primary-container": "#ad8eff",
                        "inverse-on-surface": "#5d4e73",
                        "primary-dim": "#844eff",
                        "on-surface": "#eee0ff",
                        "on-secondary-container": "#e8fbff",
                        "inverse-surface": "#fef7ff",
                        "secondary-container": "#006875",
                        "on-error-container": "#ffb2b9",
                        "on-tertiary": "#400040",
                        "on-primary-container": "#2b006f",
                        "on-primary": "#38008d",
                        "on-tertiary-fixed-variant": "#6a006a",
                        "surface-tint": "#b99fff",
                        "surface": "#140727",
                        "tertiary-fixed-dim": "#ff61f8",
                        "surface-dim": "#140727",
                        "secondary-dim": "#00d4ec",
                        "on-background": "#eee0ff",
                        "tertiary-dim": "#ff51fa",
                        "outline-variant": "#4f4165",
                        "surface-container-lowest": "#000000",
                        "primary": "#b99fff"
                    },
                    fontFamily: {
                        "headline": ["Space Grotesk"],
                        "body": ["Be Vietnam Pro"],
                        "label": ["Space Grotesk"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .neon-glow-primary {
            box-shadow: 0 0 15px rgba(185, 159, 255, 0.4);
        }
        .neon-glow-secondary {
            box-shadow: 0 0 15px rgba(0, 227, 253, 0.4);
        }
        .glass-panel {
            background: rgba(46, 28, 75, 0.2);
            backdrop-filter: blur(20px);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen flex flex-col overflow-hidden">
<!-- TopAppBar Shared Component -->
<header class="w-full top-0 left-0 bg-transparent flex justify-between items-center px-6 py-4 z-50">
<div class="flex items-center gap-4">
<button class="text-[#b99fff] hover:text-[#00e3fd] transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<div class="flex flex-col">
<h1 class="text-2xl font-bold text-[#b99fff] drop-shadow-[0_0_8px_rgba(185,159,255,0.6)] font-['Space_Grotesk'] uppercase tracking-widest">NEON KINETIC</h1>
<span class="font-label text-[10px] tracking-[0.2em] text-secondary">LEVEL 01</span>
</div>
</div>
<button class="text-[#b99fff] hover:text-[#00e3fd] transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</button>
</header>
<main class="flex-1 flex flex-col items-center justify-start px-4 pb-32 pt-2 relative">
<!-- Game Layout: Grid and Sidebar Stats -->
<div class="w-full max-w-md flex gap-4 items-start justify-center">
<!-- Left Side: Tetris Grid -->
<div class="relative group">
<!-- Background Well -->
<div class="bg-surface-container-lowest p-1 rounded-lg border border-primary/10 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
<div class="grid grid-cols-10 grid-rows-[repeat(20,minmax(0,1fr))] gap-px w-[240px] h-[480px] md:w-[280px] md:h-[560px] bg-surface-container-lowest/50">
<!-- Simulated Blocks Rendered with Tailwind -->
<!-- Row 20 (Bottom) -->
<div class="bg-primary/20 rounded-sm"></div>
<div class="bg-primary border border-primary-fixed-dim/50 rounded-sm neon-glow-primary"></div>
<div class="bg-primary border border-primary-fixed-dim/50 rounded-sm neon-glow-primary"></div>
<div class="col-start-8 bg-secondary border border-secondary-fixed/50 rounded-sm neon-glow-secondary"></div>
<div class="bg-secondary border border-secondary-fixed/50 rounded-sm neon-glow-secondary"></div>
<div class="bg-secondary border border-secondary-fixed/50 rounded-sm neon-glow-secondary"></div>
<!-- Row 19 -->
<div class="col-start-2 bg-primary border border-primary-fixed-dim/50 rounded-sm neon-glow-primary"></div>
<div class="bg-primary border border-primary-fixed-dim/50 rounded-sm neon-glow-primary"></div>
<div class="col-start-9 bg-secondary border border-secondary-fixed/50 rounded-sm neon-glow-secondary"></div>
<!-- Active Falling Piece (J-shape) -->
<div class="col-start-5 row-start-6 bg-tertiary border border-tertiary-fixed/50 rounded-sm shadow-[0_0_15px_rgba(255,81,250,0.4)]"></div>
<div class="col-start-5 row-start-7 bg-tertiary border border-tertiary-fixed/50 rounded-sm shadow-[0_0_15px_rgba(255,81,250,0.4)]"></div>
<div class="col-start-5 row-start-8 bg-tertiary border border-tertiary-fixed/50 rounded-sm shadow-[0_0_15px_rgba(255,81,250,0.4)]"></div>
<div class="col-start-4 row-start-8 bg-tertiary border border-tertiary-fixed/50 rounded-sm shadow-[0_0_15px_rgba(255,81,250,0.4)]"></div>
<!-- Ghost Piece -->
<div class="col-start-5 row-start-[19] border border-tertiary/30 rounded-sm"></div>
<div class="col-start-5 row-start-[20] border border-tertiary/30 rounded-sm"></div>
<div class="col-start-5 row-start-[21] border border-tertiary/30 rounded-sm"></div>
<div class="col-start-4 row-start-[21] border border-tertiary/30 rounded-sm"></div>
<!-- Grid Lines (Subtle) -->
<!-- Generative empty cells to fill the grid -->
<div class="col-span-full row-span-full grid grid-cols-10 grid-rows-20 pointer-events-none opacity-5">
<!-- Loop for grid lines simulated by child divs if needed, but the gap-px on parent handles it -->
</div>
</div>
</div>
</div>
<!-- Right Side: HUD Panels -->
<div class="flex flex-col gap-4 w-24 md:w-32">
<!-- Next Piece Preview -->
<div class="glass-panel p-3 rounded-xl border border-outline-variant/20">
<p class="font-label text-[10px] uppercase tracking-wider text-on-surface-variant mb-2 text-center">Next</p>
<div class="aspect-square bg-surface-container-lowest/40 rounded-lg flex items-center justify-center p-2">
<div class="grid grid-cols-2 grid-rows-2 gap-1">
<div class="w-5 h-5 bg-secondary border border-secondary-fixed/50 rounded-sm neon-glow-secondary"></div>
<div class="w-5 h-5 bg-secondary border border-secondary-fixed/50 rounded-sm neon-glow-secondary"></div>
<div class="w-5 h-5 bg-secondary border border-secondary-fixed/50 rounded-sm neon-glow-secondary"></div>
<div class="w-5 h-5 bg-secondary border border-secondary-fixed/50 rounded-sm neon-glow-secondary"></div>
</div>
</div>
</div>
<!-- Stats -->
<div class="glass-panel p-3 rounded-xl border border-outline-variant/20 flex flex-col gap-3">
<div>
<p class="font-label text-[10px] uppercase tracking-wider text-on-surface-variant">Score</p>
<p class="font-headline text-lg font-bold text-on-surface">12,450</p>
</div>
<div>
<p class="font-label text-[10px] uppercase tracking-wider text-on-surface-variant">Lines</p>
<p class="font-headline text-lg font-bold text-on-surface">24</p>
</div>
</div>
<!-- Combo Chip -->
<div class="bg-secondary-container/30 border border-secondary/20 rounded-full px-3 py-1 flex items-center justify-center gap-1">
<span class="material-symbols-outlined text-[14px] text-secondary" style="font-variation-settings: 'FILL' 1;">bolt</span>
<span class="font-label text-[10px] font-bold text-secondary uppercase tracking-tighter">X3 Combo</span>
</div>
</div>
</div>
<!-- On-Screen Controls -->
<div class="fixed bottom-24 left-0 w-full px-6 flex justify-between items-end z-40 max-w-md mx-auto left-1/2 -translate-x-1/2">
<!-- D-Pad Style Movement -->
<div class="flex gap-2">
<button class="w-14 h-14 rounded-full glass-panel border border-primary/20 flex items-center justify-center text-primary active:scale-90 transition-transform neon-glow-primary">
<span class="material-symbols-outlined text-3xl">chevron_left</span>
</button>
<button class="w-14 h-14 rounded-full glass-panel border border-primary/20 flex items-center justify-center text-primary active:scale-90 transition-transform neon-glow-primary">
<span class="material-symbols-outlined text-3xl">chevron_right</span>
</button>
</div>
<!-- Action Buttons -->
<div class="flex flex-col gap-4 items-center">
<button class="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary shadow-lg shadow-primary/40 active:scale-90 transition-transform">
<span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">rotate_right</span>
</button>
<button class="w-14 h-14 rounded-full glass-panel border border-secondary/20 flex items-center justify-center text-secondary active:scale-90 transition-transform neon-glow-secondary">
<span class="material-symbols-outlined text-3xl">keyboard_double_arrow_down</span>
</button>
</div>
</div>
</main>
<!-- BottomNavBar Shared Component -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-6 pt-4 bg-[#140727]/80 backdrop-blur-xl rounded-t-[2rem] border-t border-[#b99fff]/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
<a class="flex flex-col items-center justify-center bg-[#b99fff]/20 text-[#b99fff] rounded-full p-3 shadow-[0_0_15px_rgba(185,159,255,0.4)] active:scale-90 transition-transform duration-150" href="#">
<span class="material-symbols-outlined" data-icon="play_arrow" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</a>
<a class="flex flex-col items-center justify-center text-[#eee0ff]/40 p-3 hover:bg-[#b99fff]/10 active:scale-90 transition-transform duration-150" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
</a>
<a class="flex flex-col items-center justify-center text-[#eee0ff]/40 p-3 hover:bg-[#b99fff]/10 active:scale-90 transition-transform duration-150" href="#">
<span class="material-symbols-outlined" data-icon="emoji_events">emoji_events</span>
</a>
<a class="flex flex-col items-center justify-center text-[#eee0ff]/40 p-3 hover:bg-[#b99fff]/10 active:scale-90 transition-transform duration-150" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
</a>
</nav>
<!-- Subtle Ambient Background Glows -->
<div class="fixed top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
<div class="fixed bottom-1/4 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
</body></html>