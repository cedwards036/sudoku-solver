import assert from 'assert';
import {solveClassicSudoku} from '../src/index';

describe('solveClassicSudoku', () => {
    it('throws an error given an invalid puzzle', () => {
        assert.throws(() => {
            solveClassicSudoku([['a']]);
        });
    });

    it('solves classic sudokus', () => {
        const sudoku1 = [
            [6, 0, 0, 7, 0, 8, 0, 0, 4],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 1, 0, 3, 0, 0],
            [7, 0, 0, 0, 0, 0, 0, 0, 6],
            [0, 0, 3, 0, 9, 0, 2, 0, 0],
            [8, 0, 0, 0, 0, 0, 0, 0, 7],
            [0, 0, 8, 0, 5, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [4, 0, 0, 1, 0, 9, 0, 0, 5],
        ];
        const solution1 = [
            [6, 3, 5, 7, 2, 8, 9, 1, 4],
            [1, 8, 4, 9, 6, 3, 7, 5, 2],
            [9, 7, 2, 5, 1, 4, 3, 6, 8],
            [7, 1, 9, 2, 8, 5, 4, 3, 6],
            [5, 4, 3, 6, 9, 7, 2, 8, 1],
            [8, 2, 6, 3, 4, 1, 5, 9, 7],
            [2, 9, 8, 4, 5, 6, 1, 7, 3],
            [3, 5, 1, 8, 7, 2, 6, 4, 9],
            [4, 6, 7, 1, 3, 9, 8, 2, 5],
        ];
        assert.deepStrictEqual(solveClassicSudoku(sudoku1), [solution1]);

        const sudoku2 = [
            [0, 0, 0, 0, 0, 1, 0, 0, 2],
            [0, 0, 3, 0, 0, 0, 0, 4, 0],
            [0, 5, 0, 0, 6, 0, 7, 0, 0],
            [0, 0, 0, 8, 0, 0, 0, 7, 0],
            [0, 0, 7, 0, 0, 3, 8, 0, 0],
            [9, 0, 0, 0, 5, 0, 0, 0, 1],
            [0, 0, 6, 0, 8, 0, 2, 0, 0],
            [0, 4, 0, 6, 0, 0, 0, 0, 7],
            [2, 0, 0, 0, 0, 9, 0, 6, 0],
        ];
        const solution2 = [
            [8, 7, 9, 4, 3, 1, 6, 5, 2],
            [6, 2, 3, 5, 9, 7, 1, 4, 8],
            [1, 5, 4, 2, 6, 8, 7, 9, 3],
            [4, 3, 2, 8, 1, 6, 5, 7, 9],
            [5, 1, 7, 9, 4, 3, 8, 2, 6],
            [9, 6, 8, 7, 5, 2, 4, 3, 1],
            [7, 9, 6, 3, 8, 4, 2, 1, 5],
            [3, 4, 1, 6, 2, 5, 9, 8, 7],
            [2, 8, 5, 1, 7, 9, 3, 6, 4],
        ];
        assert.deepStrictEqual(solveClassicSudoku(sudoku2), [solution2]);
    });
});