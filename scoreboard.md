<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;family=Be_Vietnam_Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style id="tailwind-config">
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
            text-shadow: 0 0 10px rgba(185, 159, 255, 0.6);
        }
        .neon-glow-secondary {
            text-shadow: 0 0 10px rgba(0, 227, 253, 0.6);
        }
        .neon-border-glow {
            box-shadow: 0 0 15px rgba(185, 159, 255, 0.2), inset 0 0 10px rgba(185, 159, 255, 0.1);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen flex flex-col overflow-x-hidden">
<!-- Top Navigation Anchor -->
<header class="w-full top-0 left-0 bg-transparent flex justify-between items-center px-6 py-4 w-full z-50">
<div class="flex items-center gap-4">
<button class="text-[#b99fff] active:scale-95 duration-200 transition-colors hover:text-[#00e3fd]">
<span class="material-symbols-outlined">menu</span>
</button>
<h1 class="text-2xl font-bold text-[#b99fff] drop-shadow-[0_0_8px_rgba(185,159,255,0.6)] font-['Space_Grotesk'] uppercase tracking-widest">NEON KINETIC</h1>
</div>
<button class="text-[#b99fff] active:scale-95 duration-200 transition-colors hover:text-[#00e3fd]">
<span class="material-symbols-outlined">settings</span>
</button>
</header>
<main class="flex-grow px-6 pt-4 pb-32 max-w-lg mx-auto w-full">
<!-- Dashboard Header / Active State -->
<div class="mb-8 flex justify-between items-end">
<div>
<p class="font-label text-secondary text-xs uppercase tracking-[0.2em] mb-1">Session Active</p>
<h2 class="font-headline text-3xl font-bold uppercase tracking-tight text-on-surface">Live Stats</h2>
</div>
<div class="bg-surface-container-high px-4 py-2 rounded-lg border border-primary/20 backdrop-blur-md">
<span class="font-label text-primary-fixed-dim text-sm uppercase font-bold tracking-widest">Level 14</span>
</div>
</div>
<!-- Bento Grid Stats Layout -->
<div class="grid grid-cols-2 gap-4">
<!-- Primary Score Card (Large) -->
<div class="col-span-2 bg-surface-container-low border border-primary/30 rounded-xl p-6 relative overflow-hidden group neon-border-glow">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-8xl" style="font-variation-settings: 'FILL' 1;">emoji_events</span>
</div>
<div class="relative z-10">
<p class="font-label text-primary-fixed-dim text-[10px] uppercase tracking-[0.3em] mb-2">Current Score</p>
<div class="flex items-baseline gap-2">
<span class="font-headline text-5xl font-extrabold text-on-surface neon-glow-primary">248,590</span>
</div>
</div>
<div class="mt-4 flex items-center gap-2">
<div class="h-1 flex-grow bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-primary to-secondary w-3/4 shadow-[0_0_8px_rgba(185,159,255,0.5)]"></div>
</div>
<span class="font-label text-[10px] text-on-surface-variant uppercase">Next Bonus</span>
</div>
</div>
<!-- Lines Cleared -->
<div class="bg-surface-container-low border border-primary/20 rounded-xl p-5 backdrop-blur-sm">
<div class="flex items-center gap-2 mb-3">
<span class="material-symbols-outlined text-secondary text-lg">reorder</span>
<p class="font-label text-on-surface-variant text-[10px] uppercase tracking-widest">Lines Cleared</p>
</div>
<p class="font-headline text-3xl font-bold text-on-surface">142</p>
<div class="mt-2 text-[10px] font-bold text-secondary-dim font-label">+12 Streak</div>
</div>
<!-- Time Elapsed -->
<div class="bg-surface-container-low border border-primary/20 rounded-xl p-5 backdrop-blur-sm">
<div class="flex items-center gap-2 mb-3">
<span class="material-symbols-outlined text-tertiary text-lg">timer</span>
<p class="font-label text-on-surface-variant text-[10px] uppercase tracking-widest">Time Elapsed</p>
</div>
<p class="font-headline text-3xl font-bold text-on-surface">08:24</p>
<div class="mt-2 text-[10px] font-bold text-on-surface-variant/40 font-label">MM:SS</div>
</div>
<!-- High Score (Subtle Shift) -->
<div class="col-span-2 bg-surface-bright/20 border border-primary/40 rounded-xl p-6 flex justify-between items-center overflow-hidden relative">
<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
<div class="relative z-10">
<p class="font-label text-on-surface-variant text-[10px] uppercase tracking-[0.2em] mb-1">Personal Best</p>
<p class="font-headline text-2xl font-bold text-primary-fixed">1,042,000</p>
</div>
<div class="relative z-10 flex flex-col items-end">
<div class="bg-primary/20 text-primary-fixed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter mb-1 border border-primary/30">Rank: Pro</div>
<p class="text-[10px] text-on-surface-variant font-label uppercase">Top 2% Globally</p>
</div>
</div>
<!-- Visual Break / Decorative Asset -->
<div class="col-span-2 mt-4">
<div class="rounded-xl overflow-hidden h-32 relative group">
<img class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" data-alt="abstract digital art showing glowing neon geometric lines and glass panels with deep purple and cyan lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZaFoOcRK9B064Af31iYvvy8d8fIKHb8cn_JupphDTpp-37JND1lqgquoGzI-ueb-SD6cY8rzPiRq3jKymW2wViYz-RxPcujQDM757d2OovO8MgezP4ZydwkP_iwN5QDLcDxCplhE0P4C_xDiRbEzeyT-naVhF0oQnrvL8OP96q4bMLNYKXu7RcQfDI7aCvPPbPSuaXsP63bi3sjVamuA30HldjCxXPy3_KuIH-T15u8NzuhZZoMWVupgjYSpOxKeCfjXR_HbOMdY"/>
<div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
<div class="absolute bottom-4 left-4">
<p class="text-xs font-label uppercase tracking-widest text-secondary neon-glow-secondary font-bold">Dynamic HUD Active</p>
<p class="text-[10px] text-on-surface-variant/80 uppercase">Kinetic Feedback Engine v4.2</p>
</div>
</div>
</div>
</div>
</main>
<!-- Bottom Navigation Shell -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-6 pt-4 bg-[#140727]/80 backdrop-blur-xl border-t border-[#b99fff]/10 rounded-t-[2rem] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
<!-- Play Tab (Semantic Home) -->
<a class="flex flex-col items-center justify-center text-[#eee0ff]/40 p-3 hover:bg-[#b99fff]/10 transition-transform duration-150 active:scale-90" href="#">
<span class="material-symbols-outlined text-2xl">play_arrow</span>
<span class="font-['Be_Vietnam_Pro'] text-[10px] uppercase tracking-tighter mt-1">Play</span>
</a>
<!-- Stats Tab (Active based on user request) -->
<a class="flex flex-col items-center justify-center bg-[#b99fff]/20 text-[#b99fff] rounded-full p-3 shadow-[0_0_15px_rgba(185,159,255,0.4)] transition-transform duration-150 active:scale-90" href="#">
<span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">leaderboard</span>
<span class="font-['Be_Vietnam_Pro'] text-[10px] uppercase tracking-tighter mt-1">Stats</span>
</a>
<!-- Events Tab -->
<a class="flex flex-col items-center justify-center text-[#eee0ff]/40 p-3 hover:bg-[#b99fff]/10 transition-transform duration-150 active:scale-90" href="#">
<span class="material-symbols-outlined text-2xl">emoji_events</span>
<span class="font-['Be_Vietnam_Pro'] text-[10px] uppercase tracking-tighter mt-1">Awards</span>
</a>
<!-- Profile Tab -->
<a class="flex flex-col items-center justify-center text-[#eee0ff]/40 p-3 hover:bg-[#b99fff]/10 transition-transform duration-150 active:scale-90" href="#">
<span class="material-symbols-outlined text-2xl">person</span>
<span class="font-['Be_Vietnam_Pro'] text-[10px] uppercase tracking-tighter mt-1">Profile</span>
</a>
</nav>
</body></html>