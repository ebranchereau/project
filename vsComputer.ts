"use strict";
export{};

// Variable declarations
const divs = document.querySelectorAll('.grid-item');
const moveButton = document.getElementById('moveButton')!;
const playAgainButton = document.getElementById('playAgain')!;
const title = document.getElementById('title')!;

let moveMode = 0; // 0 for random move, 1 for best move
let turn: boolean = true;
let clickCount: number = 0;
let winnerValue: string | null = null;
const text: [string, string] = ['X', 'O'];
let index: number = 0;

// Event listener for toggling move mode between random and best
moveButton.addEventListener('click', e => {
    moveMode = 1 - moveMode;
    moveButton.innerText = moveMode === 1 ? 'Best' : 'Random';
});

// Adding event listeners to all grid items
divs.forEach(function (div) {
    div.addEventListener('click', classTogglerComputer);
});

// Event listener for play again button
playAgainButton.addEventListener('click', e => {
    resetGame();
});

/**
 * Function to handle the click event on grid items
 */
function classTogglerComputer(this: any) {
    // If the clicked cell is empty and there's no winner yet, and it's player's turn
    if (this.textContent === "" && winnerValue === null && turn) {
        // Mark the cell with 'X' for player
        this.textContent = 'X';
        index = 1 - index;
        clickCount++;
        turn = false;
    }

    const grid = getCurrentGridState();
    // Checking game state for winner or draw
    checkGameState(grid);
    // If there's no winner yet, and it's computer's turn, and not all cells are filled
    if (winnerValue === null && !turn && clickCount !== 9) {
        if (moveMode === 1) {
            bestMove(grid);
        } else {
            randomMove(grid);
        }
    }
    // Checking game state for winner or draw
    checkGameState(grid);
}


/**
 * Function to make a random move for the computer
 * @param grid Current state of the grid
 */
function randomMove(grid: string[]) {
    let i: number = Math.floor(Math.random() * 9);
    while (grid[i] !== "") {
        i = Math.floor(Math.random() * 9);
    }
    document.getElementById((i + 1).toString())!.innerText = 'O';
    clickCount++;
    turn = true;
}


/**
 * Function to make the best move for the computer using the minimax algorithm
 * @param grid Current state of the grid
 */
function bestMove(grid: string[]) {
    let bestScore = -Infinity;
    let move: number | null = null;
    for (let i = 0; i < 9; i++) {
        if (grid[i] === '') {
            grid[i] = 'O';
            const score = minimax(grid, 0, false);
            grid[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    if (move !== null) {
        document.getElementById((move + 1).toString())!.innerText = 'O';
        checkGameState(grid);
        clickCount++;
        turn = true;
        checkGameState(grid);
    }
}

/**
 * Function to get the current state of the grid from HTML
 * @returns Current state of the grid
 */
function getCurrentGridState(): string[] {
    const grid: string[] = [];
    for (let i = 1; i <= 9; i++) {
        grid.push(document.getElementById(i.toString())!.innerText);
    }
    return grid;
}

/**
 * Function to check the game state for winner or draw
 * @param grid Current state of the grid
 */
function checkGameState(grid: string[]) {
    const result = checkWinner(grid);
    if (result) {
        endGame(result);
    } else if (clickCount === 9) {
        endGame('draw');
    }
}

/**
 * Function to reset the game to its initial state
 */
function resetGame() {
    divs.forEach(function (div) {
        div.textContent = "";
    });
    winnerValue = null;
    clickCount = 0;
    turn = true;
    title.textContent = "You vs Computer";
}

/**
 * Function to end the game and display the result
 * @param result Result of the game ('X' for player win, 'O' for computer win, 'draw' for draw)
 */
function endGame(result: string) {
    winnerValue = result;
    
    if (result === 'X') {
        title.textContent = "You won!";
        
    } else if (result === 'O') {
        title.textContent = "Computer won!";
    } else {
        title.textContent = "Draw!";
    }
    title.style.textAlign = "center";
    title.style.fontSize = "50px";
    title.style.margin = "10px";
}

/**
 * Minimax algorithm implementation to determine the best move for the computer
 * @param grid Current state of the grid
 * @param depth Depth of recursion
 * @param isMaximizing Indicates whether it's maximizing player's turn or not
 * @returns Score of the move
 */
function minimax(grid: string[], depth: number, isMaximizing: boolean): number {
    const result = checkWinner(grid);
    if (result !== null) {
        return scores[result];
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (grid[i] === '') {
                grid[i] = 'O';
                const score = minimax(grid, depth + 1, false);
                grid[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (grid[i] === '') {
                grid[i] = 'X';
                const score = minimax(grid, depth + 1, true);
                grid[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

/**
 * Function to check for a winner in the current grid
 * @param grid Current state of the grid
 * @returns Winner ('X' or 'O') or 'draw' if the game is drawn, null otherwise
 */
export function checkWinner(grid: string[]): string | null {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (grid[a] !== '' && grid[a] === grid[b] && grid[a] === grid[c]) {
            return grid[a];
        }
    }
    return grid.includes('') ? null : 'draw';
}

const scores: Record<string, number> = {
    'X': -10,
    'O': 10,
    'draw': 0
};

const WINNING_COMBINATIONS: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];


