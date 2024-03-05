"use strict";

var moveMode = 0; // 0 for random move, 1 for best move
var turn = true;
var clickCount = 0;
var winnerValue = null;
var text = ['X', 'O'];
var index = 0;

document.addEventListener('DOMContentLoaded', function () {
    var playAgainButton = document.getElementById('playAgain');
    playAgainButton.addEventListener('click', function (e) {
        resetGame();
    });

    var moveButton = document.getElementById('moveButton');
    moveButton.addEventListener('click', () => { //function(e)
        moveMode = 1 - moveMode;
        moveButton.innerText = moveMode === 1 ? 'Best' : 'Random';
    });

    var divs = document.querySelectorAll('.grid-item');
    divs.forEach(function(div) {
        div.addEventListener('click', classTogglerComputer);
    });
});

function classTogglerComputer() {
    if (this.textContent === "" && winnerValue === null && turn) {
        this.textContent = 'X';
        index = 1 - index;
        clickCount++;
        turn = false;
    }
    var grid = getCurrentGridState();
    checkGameState(grid);
    if (winnerValue === null && !turn && clickCount !== 9) {
        if (moveMode === 1) {
            bestMove(grid);
        }
        else {
            randomMove(grid);
        }
        
    }
    checkGameState(grid);
}
function randomMove(grid) {
    var i = Math.floor(Math.random() * 9);
    while (grid[i] !== "") {
        i = Math.floor(Math.random() * 9);
    }
    document.getElementById((i + 1).toString()).innerText = 'O';
    clickCount++;
    turn = true;
}
function bestMove(grid) {
    var bestScore = -Infinity;
    var move = null;
    for (var i = 0; i < 9; i++) {
        if (grid[i] === '') {
            grid[i] = 'O';
            var score = minimax(grid, 0, false);
            grid[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    if (move !== null) {
        document.getElementById((move + 1).toString()).innerText = 'O';
        checkGameState(grid);
        clickCount++;
        turn = true;
        checkGameState(grid);
    }
}
function getCurrentGridState() {
    var grid = [];
    for (var i = 1; i <= 9; i++) {
        grid.push(document.getElementById(i.toString()).innerText);
    }
    return grid;
}
function checkGameState(grid) {
    var result = checkWinner(grid);
    if (result) {
        endGame(result);
    }
    else if (clickCount === 9) {
        endGame('draw');
    }
}
function resetGame() {
    divs.forEach(function (div) {
        div.textContent = "";
    });
    winnerValue = null;
    clickCount = 0;
    turn = true;
    title.textContent = "You vs Computer";
}
function endGame(result) {
    winnerValue = result;
    if (result === 'X') {
        title.textContent = "You won!";
    }
    else if (result === 'O') {
        title.textContent = "Computer won!";
    }
    else {
        title.textContent = "Draw!";
    }
    title.style.textAlign = "center";
    title.style.fontSize = "50px";
    title.style.margin = "10px";
}
function minimax(grid, depth, isMaximizing) {
    var result = checkWinner(grid);
    if (result !== null) {
        return scores[result];
    }
    if (isMaximizing) {
        var bestScore = -Infinity;
        for (var i = 0; i < 9; i++) {
            if (grid[i] === '') {
                grid[i] = 'O';
                var score = minimax(grid, depth + 1, false);
                grid[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    }
    else {
        var bestScore = Infinity;
        for (var i = 0; i < 9; i++) {
            if (grid[i] === '') {
                grid[i] = 'X';
                var score = minimax(grid, depth + 1, true);
                grid[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
function checkWinner(grid) {
    for (var i = 0; i < WINNING_COMBINATIONS.length; i++) {
        var _a = WINNING_COMBINATIONS[i], a = _a[0], b = _a[1], c = _a[2];
        if (grid[a] !== '' && grid[a] === grid[b] && grid[a] === grid[c]) {
            return grid[a];
        }
    }
    return grid.includes('') ? null : 'draw';
}

var scores = {
    'X': -10,
    'O': 10,
    'draw': 0
};
var WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

module.exports = { minimax: minimax, 
    checkWinner: checkWinner,
    checkGameState: checkGameState };
