import assert from 'assert';
import SudokuCoordinates from '../src/sudoku-coordinates';
import {blankSudoku} from './helpers';

describe('SudokuCoordinates', () => {
    it('auto-calculates block number from row and column numbers', () => {
        assert.equal(SudokuCoordinates({row: 0, column: 0}).block, 0);
        assert.equal(SudokuCoordinates({row: 4, column: 3}).block, 4);
        assert.equal(SudokuCoordinates({row: 8, column: 8}).block, 8);
    });

    it('can get the value in a sudoku puzzle at its coordinates', () => {
        const coords = SudokuCoordinates({row: 2, column: 4});
        const sudoku = blankSudoku(9);
        sudoku[2][4] = 6;
        assert.equal(coords.getValueIn(sudoku), 6);
    });
});