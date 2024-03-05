/** * @jest-environment jsdom */
testEnvironment: "jsdom"
const { checkWinner, minimax } = require('./pass\&play.js'); 

describe('checkWinner function', () => {
  test('should correctly identify a winner in a row', () => {
    const grid = ['X', 'X', 'X', '', '', '', '', '', ''];
    expect(checkWinner(grid)).toBe('X');
  });

  test('should correctly identify a winner in a column', () => {
    const grid = ['X', '', '', 'X', '', '', 'X', '', ''];
    expect(checkWinner(grid)).toBe('X');
  });

  test('should correctly identify a winner in a diagonal', () => {
    const grid = ['X', '', '', '', 'X', '', '', '', 'X'];
    expect(checkWinner(grid)).toBe('X');
  });

  test('should return null if there is no winner yet', () => {
    const grid = ['X', 'O', 'X', '', '', '', '', '', ''];
    expect(checkWinner(grid)).toBeNull();
  });

  test('should correctly identify a draw', () => {
    const grid = ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O'];
    expect(checkWinner(grid)).toBe('draw');
  });
});

describe('minimax function', () => {
  test('should return the correct score for a maximizing player', () => {
    const grid = ['X', 'X', '', 'O', 'O', '', '', '', ''];
    expect(minimax(grid, 0, true)).toBe(10);
  });

  test('should return the correct score for a minimizing player', () => {
    const grid = ['X', 'X', '', 'O', 'O', '', '', '', ''];
    expect(minimax(grid, 0, false)).toBe(-10);
  });

  test('should return 0 for a draw state', () => {
    const grid = ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O'];
    expect(minimax(grid, 0, true)).toBe(0);
  });
});
