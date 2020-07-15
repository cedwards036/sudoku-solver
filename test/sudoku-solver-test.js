import assert from 'assert';
import SudokuPuzzle from '../src/sudoku-puzzle';
import {solveClassicSudoku} from '../src/sudoku-solver';

describe('solveClassicSudoku', () => {
    it('returns an empty array for a puzzle with no solution', () => {
        const puzzle = [
            [1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        assert.deepStrictEqual(solveClassicSudoku(puzzle), []);
    });

    it('returns the solution for a puzzle with one solution', () => {
        const puzzle = [
            [5, 0, 0, 2, 0, 0, 0, 4, 0],
            [0, 0, 0, 6, 0, 3, 0, 0, 0],
            [0, 3, 0, 0, 0, 9, 0, 0, 7],
            [0, 0, 3, 0, 0, 7, 0, 0, 0],
            [0, 0, 7, 0, 0, 8, 0, 0, 0],
            [6, 0, 0, 0, 0, 0, 0, 2, 0],
            [0, 8, 0, 0, 0, 0, 0, 0, 3],
            [0, 0, 0, 4, 0, 0, 6, 0, 0],
            [0, 0, 0, 1, 0, 0, 5, 0, 0],
        ]
        const solution = SudokuPuzzle([
            [5, 9, 8, 2, 7, 1, 3, 4, 6],
            [7, 4, 2, 6, 5, 3, 8, 9, 1],
            [1, 3, 6, 8, 4, 9, 2, 5, 7],
            [8, 1, 3, 5, 2, 7, 9, 6, 4],
            [4, 2, 7, 9, 6, 8, 1, 3, 5],
            [6, 5, 9, 3, 1, 4, 7, 2, 8],
            [2, 8, 5, 7, 9, 6, 4, 1, 3],
            [9, 7, 1, 4, 3, 5, 6, 8, 2],
            [3, 6, 4, 1, 8, 2, 5, 7, 9],
        ]);
        assert.deepStrictEqual(solveClassicSudoku(puzzle), [solution]);
    });

    it('returns no more than two solutions for puzzles with multiple solutions', () => {
        const puzzle = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        assert.equal(solveClassicSudoku(puzzle).length, 2);
    });
});