import assert from 'assert';
import SudokuPuzzle from '../src/sudoku-puzzle';

describe('SudokuPuzzle', () => {
    it('can create an empty grid given a game dimension', () => {
        const sudoku = SudokuPuzzle.createEmpty(3);
        for (let i = 0; i < 3; i++) {
            assert.deepStrictEqual(sudoku[i], new Array(3).fill(0));
        }
    });

    it('saves the source grid for later access if one is provided', () => {
        const sudoku = SudokuPuzzle([
            [1, 0, 2, 3],
            [0, 4, 0, 1],
            [0, 2, 4, 0],
            [0, 0, 2, 0]
        ]);
        assert.deepStrictEqual(sudoku[0], [1, 0, 2, 3]);
        assert.deepStrictEqual(sudoku[1], [0, 4, 0, 1]);
        assert.deepStrictEqual(sudoku[2], [0, 2, 4, 0]);
        assert.deepStrictEqual(sudoku[3], [0, 0, 2, 0]);
    });

    it('can return any column as an array', () => {
        const sudoku = SudokuPuzzle([
            [1, 0, 2, 3],
            [0, 4, 0, 1],
            [0, 2, 4, 0],
            [0, 0, 2, 0]
        ]);
        assert.deepStrictEqual(sudoku.getCol(0), [1, 0, 0, 0]);
        assert.deepStrictEqual(sudoku.getCol(2), [2, 0, 4, 2]);
    });

    it('can return any row as an array', () => {
        const sudoku = SudokuPuzzle([
            [1, 0, 2, 3],
            [0, 4, 0, 1],
            [0, 2, 4, 0],
            [0, 0, 2, 0]
        ]);
        assert.deepStrictEqual(sudoku.getRow(0), [1, 0, 2, 3]);
        assert.deepStrictEqual(sudoku.getRow(2), [0, 2, 4, 0]);
    });

    it('can return any block as an array in row-major order', () => {
        const sudoku = SudokuPuzzle([
            [1, 0, 2, 3],
            [0, 4, 0, 1],
            [0, 2, 4, 0],
            [0, 0, 2, 0]
        ]);
        assert.deepStrictEqual(sudoku.getBlock(0), [1, 0, 0, 4]);
        assert.deepStrictEqual(sudoku.getBlock(2), [0, 2, 0, 0]);
    });
});