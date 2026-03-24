export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30; // 30px per block

export const COLORS = [
    'none',           // 0
    '#00d8ff',        // 1: I (Cyan)
    '#0055ff',        // 2: J (Blue)
    '#ff8800',        // 3: L (Orange)
    '#ffd500',        // 4: O (Yellow)
    '#00ff2a',        // 5: S (Green)
    '#b800ff',        // 6: T (Purple)
    '#ff003c'         // 7: Z (Red)
];

// Matrix representing the shapes
// The number corresponds to the color index in COLORS array
export const SHAPES = [
    [],
    // 1: I
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    // 2: J
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    // 3: L
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
    ],
    // 4: O
    [
        [4, 4],
        [4, 4]
    ],
    // 5: S
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ],
    // 6: T
    [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]
    ],
    // 7: Z
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
    ]
];
