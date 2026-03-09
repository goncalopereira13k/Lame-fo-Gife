'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

const WIDTH = 800;
const HEIGHT = 800;
const CELL_SIZE = 10;
const NUM_ROWS = WIDTH / CELL_SIZE;
const NUM_COLS = HEIGHT / CELL_SIZE;

const colors = ['black', 'white'];

type Board = number[][];

// Pre-built patterns (relative coordinates where cells are alive)
const PATTERNS: Record<string, { name: string; cells: [number, number][] }> = {
    glider: {
        name: 'Glider',
        cells: [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
    },
    blinker: {
        name: 'Blinker',
        cells: [[0, 0], [0, 1], [0, 2]],
    },
    pulsar: {
        name: 'Pulsar',
        cells: [
            // Top section
            [-6, -4], [-6, -3], [-6, -2], [-6, 2], [-6, 3], [-6, 4],
            [-4, -6], [-4, -1], [-4, 1], [-4, 6],
            [-3, -6], [-3, -1], [-3, 1], [-3, 6],
            [-2, -6], [-2, -1], [-2, 1], [-2, 6],
            [-1, -4], [-1, -3], [-1, -2], [-1, 2], [-1, 3], [-1, 4],
            // Bottom section (mirror)
            [1, -4], [1, -3], [1, -2], [1, 2], [1, 3], [1, 4],
            [2, -6], [2, -1], [2, 1], [2, 6],
            [3, -6], [3, -1], [3, 1], [3, 6],
            [4, -6], [4, -1], [4, 1], [4, 6],
            [6, -4], [6, -3], [6, -2], [6, 2], [6, 3], [6, 4],
        ],
    },
    gliderGun: {
        name: 'Gosper Glider Gun',
        cells: [
            // Left block
            [0, 0], [0, 1], [1, 0], [1, 1],
            // Left part
            [0, 10], [1, 10], [2, 10],
            [-1, 11], [3, 11],
            [-2, 12], [-2, 13], [4, 12], [4, 13],
            [1, 14],
            [-1, 15], [3, 15],
            [0, 16], [1, 16], [2, 16],
            [1, 17],
            // Right part
            [-2, 20], [-1, 20], [0, 20],
            [-2, 21], [-1, 21], [0, 21],
            [-3, 22], [1, 22],
            [-4, 24], [-3, 24], [1, 24], [2, 24],
            // Right block
            [-2, 34], [-1, 34], [-2, 35], [-1, 35],
        ],
    },
};

function createBoard(): Board {
    return Array.from({ length: NUM_ROWS }, () =>
        Array.from({ length: NUM_COLS }, () => 0),
    );
}

function createRandomBoard(): Board {
    return Array.from({ length: NUM_ROWS }, () =>
        Array.from({ length: NUM_COLS }, () => (Math.random() < 0.3 ? 1 : 0)),
    );
}

export default function App() {
    const [boardState, setBoardState] = useState<Board>(() => createBoard());
    const [isPlaying, setIsPlaying] = useState(false);
    const [generation, setGeneration] = useState(0);
    const [speed, setSpeed] = useState(100);
    const [selectedPattern, setSelectedPattern] = useState<string>('');
    const canvasRef = useRef<null | HTMLCanvasElement>(null);

    const computeNextBoard = useCallback(() => {
        setBoardState((prevBoardState) => {
            // countNbors now correctly uses prevBoardState
            function countNbors(r0: number, c0: number) {
                let count = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr !== 0 || dc !== 0) {
                            const r = (r0 + dr + NUM_ROWS) % NUM_ROWS;
                            const c = (c0 + dc + NUM_COLS) % NUM_COLS;

                            if (prevBoardState[r][c] === 1) {
                                count++;
                            }
                        }
                    }
                }
                return count;
            }

            const newBoard = prevBoardState.map((r) => [...r]);

            for (let r = 0; r < NUM_ROWS; r++) {
                for (let c = 0; c < NUM_COLS; c++) {
                    const aliveCount = countNbors(r, c);
                    if (prevBoardState[r][c] === 0) {
                        if (aliveCount === 3) {
                            newBoard[r][c] = 1;
                        }
                    } else {
                        if (aliveCount !== 2 && aliveCount !== 3) {
                            newBoard[r][c] = 0;
                        }
                    }
                }
            }
            return newBoard;
        });
        setGeneration((g) => g + 1);
    }, []);

    useEffect(() => {
        if (!isPlaying) {
            return;
        }
        const interval = setInterval(computeNextBoard, speed);
        return () => clearInterval(interval);
    }, [isPlaying, computeNextBoard, speed]);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 0.1;

            for (let i = 0; i < NUM_ROWS; i++) {
                for (let j = 0; j < NUM_COLS; j++) {
                    ctx.fillStyle = colors[boardState[i][j]];

                    ctx.fillRect(
                        Math.floor((WIDTH / NUM_ROWS) * i),
                        Math.floor((HEIGHT / NUM_COLS) * j),
                        CELL_SIZE,
                        CELL_SIZE);

                    ctx.strokeRect(
                        Math.floor((WIDTH / NUM_ROWS) * i),
                        Math.floor((HEIGHT / NUM_COLS) * j),
                        CELL_SIZE,
                        CELL_SIZE);
                }
            }
        }
    }, [boardState]);

    function resetBoard() {
        setBoardState(createBoard());
        setGeneration(0);
    }

    function randomizeBoard() {
        setBoardState(createRandomBoard());
        setGeneration(0);
    }

    function placePattern(patternKey: string) {
        if (!patternKey || !PATTERNS[patternKey]) return;

        const pattern = PATTERNS[patternKey];
        const newBoard = createBoard();

        // Place pattern at center of board
        const centerR = Math.floor(NUM_ROWS / 2);
        const centerC = Math.floor(NUM_COLS / 2);

        for (const [dr, dc] of pattern.cells) {
            const r = (centerR + dr + NUM_ROWS) % NUM_ROWS;
            const c = (centerC + dc + NUM_COLS) % NUM_COLS;
            newBoard[r][c] = 1;
        }

        setBoardState(newBoard);
        setGeneration(0);
        setSelectedPattern('');
    }

    function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
        const x = Math.floor(e.nativeEvent.offsetX / CELL_SIZE);
        const y = Math.floor(e.nativeEvent.offsetY / CELL_SIZE);

        setBoardState((prev) => {
            const newBoard = prev.map((r) => [...r]);
            newBoard[x][y] = newBoard[x][y] === 0 ? 1 : 0;
            return newBoard;
        });
    }

    return (
        <div className="display">
            <h1>Game of Life</h1>

            <div className="display__generation">Generation: {generation}</div>

            <div className="display__board-controls-container">
                <div className="display__board-controls">
                    <button className="display__board-controls-button" onClick={computeNextBoard}>Next</button>
                </div>
                <div className="display__board-controls">
                    <button className="display__board-controls-button" onClick={resetBoard}>Clear</button>
                </div>
                <div className="display__board-controls">
                    <button className="display__board-controls-button" onClick={randomizeBoard}>Random</button>
                </div>
                <div className="display__board-controls">
                    <button className="display__board-controls-button" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                </div>
            </div>

            <div className="display__board-controls-container">
                <div className="display__speed-control">
                    <label htmlFor="speed">Speed: {speed}ms</label>
                    <input
                        id="speed"
                        type="range"
                        min="50"
                        max="500"
                        step="50"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                    />
                </div>

                <div className="display__pattern-select">
                    <select
                        value={selectedPattern}
                        onChange={(e) => {
                            setSelectedPattern(e.target.value);
                            placePattern(e.target.value);
                        }}
                    >
                        <option value="">Load Pattern...</option>
                        {Object.entries(PATTERNS).map(([key, { name }]) => (
                            <option key={key} value={key}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <canvas
                onClick={handleCanvasClick}
                ref={canvasRef}
                width={WIDTH}
                height={HEIGHT}
                className="display__board"
            />
        </div>
    );
}
