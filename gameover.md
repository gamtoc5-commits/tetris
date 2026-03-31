<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;family=Be_Vietnam_Pro:wght@100;300;400;500;700&amp;display=swap" rel="stylesheet"/>
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
            text-shadow: 0 0 10px rgba(185, 159, 255, 0.8), 0 0 20px rgba(185, 159, 255, 0.4);
        }
        .neon-glow-tertiary {
            text-shadow: 0 0 12px rgba(255, 81, 250, 0.9), 0 0 24px rgba(255, 81, 250, 0.5);
        }
        .glass-panel {
            background: rgba(46, 28, 75, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body overflow-hidden h-screen w-full flex flex-col">
<!-- Top App Bar (Shared Component) -->
<header class="bg-transparent text-[#b99fff] font-['Space_Grotesk'] uppercase tracking-widest w-full top-0 left-0 flex justify-between items-center px-6 py-4 w-full z-10">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined cursor-pointer active:scale-95 duration-200">menu</span>
<h1 class="text-2xl font-bold text-[#b99fff] drop-shadow-[0_0_8px_rgba(185,159,255,0.6)]">NEON KINETIC</h1>
</div>
<span class="material-symbols-outlined cursor-pointer active:scale-95 duration-200">settings</span>
</header>
<!-- Main Game Context (Simulated Background Grid) -->
<main class="flex-1 relative flex items-center justify-center p-6">
<!-- Mock Game Grid behind the overlay -->
<div class="grid grid-cols-10 grid-rows-20 gap-1 w-full max-w-[320px] aspect-[1/2] bg-surface-container-lowest opacity-20 rounded-lg overflow-hidden p-1 outline outline-1 outline-outline-variant/10">
<!-- Simulated stacked blocks -->
<div class="col-start-4 col-end-6 row-start-18 bg-secondary rounded-sm shadow-[0_0_8px_rgba(0,227,253,0.5)]"></div>
<div class="col-start-6 col-end-8 row-start-18 bg-secondary rounded-sm shadow-[0_0_8px_rgba(0,227,253,0.5)]"></div>
<div class="col-start-3 col-end-5 row-start-19 bg-tertiary rounded-sm shadow-[0_0_8px_rgba(255,81,250,0.5)]"></div>
<div class="col-start-5 col-end-7 row-start-19 bg-primary rounded-sm shadow-[0_0_8px_rgba(185,159,255,0.5)]"></div>
<div class="col-start-7 col-end-9 row-start-19 bg-tertiary rounded-sm shadow-[0_0_8px_rgba(255,81,250,0.5)]"></div>
<div class="col-start-1 col-end-11 row-start-20 bg-surface-variant/30 rounded-sm"></div>
</div>
<!-- GAME OVER OVERLAY -->
<div class="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center bg-[#140727]/85 backdrop-blur-sm">
<!-- Headline Section -->
<div class="mb-12">
<p class="font-headline text-label-sm tracking-[0.4em] text-primary/60 mb-2 uppercase">Session Ended</p>
<h2 class="font-headline text-6xl md:text-7xl font-bold text-tertiary neon-glow-tertiary leading-tight italic tracking-tighter">
                    GAME<br/>OVER
                </h2>
</div>
<!-- Stats Bento-ish Layout -->
<div class="w-full max-w-sm grid grid-cols-2 gap-4 mb-12">
<!-- Score Card -->
<div class="glass-panel col-span-2 p-6 rounded-xl border border-primary/10 flex flex-col items-center">
<span class="font-headline text-xs tracking-widest text-on-surface-variant uppercase mb-1">Final Score</span>
<span class="font-headline text-5xl font-bold text-primary neon-glow-primary">42,850</span>
</div>
<!-- Level Card -->
<div class="glass-panel p-4 rounded-xl border border-primary/10 flex flex-col items-center">
<span class="font-headline text-[10px] tracking-widest text-on-surface-variant uppercase mb-1">Level</span>
<span class="font-headline text-2xl font-bold text-on-surface">14</span>
</div>
<!-- High Score Card -->
<div class="glass-panel p-4 rounded-xl border border-primary/10 flex flex-col items-center">
<span class="font-headline text-[10px] tracking-widest text-on-surface-variant uppercase mb-1">Best</span>
<span class="font-headline text-2xl font-bold text-secondary-dim">89,200</span>
</div>
</div>
<!-- Action Buttons -->
<div class="w-full max-w-sm flex flex-col gap-4">
<button class="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold text-lg rounded-full shadow-[0_0_20px_rgba(185,159,255,0.4)] active:scale-95 transition-transform flex items-center justify-center gap-2">
<span class="material-symbols-outlined">refresh</span>
                    RETRY SESSION
                </button>
<button class="w-full py-4 bg-surface-container-highest/50 text-primary border border-primary/20 font-headline font-medium text-lg rounded-full backdrop-blur-md hover:bg-primary/10 active:scale-95 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined">home</span>
                    MAIN MENU
                </button>
</div>
<!-- Share Prompt -->
<button class="mt-8 text-on-surface-variant flex items-center gap-2 font-label text-sm tracking-wide opacity-60 hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-sm">share</span>
                SHARE ACHIEVEMENT
            </button>
</div>
</main>
<!-- Bottom Nav Bar (Shared Component) -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-6 pt-4 bg-[#140727]/80 backdrop-blur-xl rounded-t-[2rem] border-t border-[#b99fff]/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
<div class="flex flex-col items-center justify-center text-[#eee0ff]/40 p-3 hover:bg-[#b99fff]/10 transition-colors cursor-pointer active:scale-90 duration-150">
<span class="material-symbols-outlined" data-icon="play_arrow">play_arrow</span>
<span class="font-['Be_Vietnam_Pro'] text-[10px] uppercase tracking-tighter mt-1">Play</span>
</div>
<div class="flex flex-col items-center justify-center text-[#eee0ff]/40 p-3 hover:bg-[#b99fff]/10 transition-colors cursor-pointer active:scale-90 duration-150">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
<span class="font-['Be_Vietnam_Pro'] text-[10px] uppercase tracking-tighter mt-1">Ranks</span>
</div>
<div class="flex flex-col items-center justify-center text-[#eee0ff]/40 p-3 hover:bg-[#b99fff]/10 transition-colors cursor-pointer active:scale-90 duration-150">
<span class="material-symbols-outlined" data-icon="emoji_events">emoji_events</span>
<span class="font-['Be_Vietnam_Pro'] text-[10px] uppercase tracking-tighter mt-1">Goals</span>
</div>
<!-- Active Tab: Profile/Person (Since session just ended, showing user profile context is relevant) -->
<div class="flex flex-col items-center justify-center bg-[#b99fff]/20 text-[#b99fff] rounded-full p-3 shadow-[0_0_15px_rgba(185,159,255,0.4)] cursor-pointer active:scale-90 duration-150">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-['Be_Vietnam_Pro'] text-[10px] uppercase tracking-tighter mt-1">Profile</span>
</div>
</nav>
</body></html>