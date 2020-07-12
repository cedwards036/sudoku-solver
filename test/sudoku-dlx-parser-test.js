import assert from 'assert';
import SudokuCoordinates from '../src/sudoku-coordinates';
import {getViableCandidatesForCell} from '../src/sudoku-dlx-parser';
import SudokuPuzzle from '../src/sudoku-puzzle';

describe('getViableCandidatesForCell', () => {
    it('indicates that no candidates are viable for an already-filled cell', () => {
        const sudoku = SudokuPuzzle.createEmpty();
        sudoku[0][0] = 1;
        const coords = SudokuCoordinates({row: 0, column: 0});
        assert.deepStrictEqual(getViableCandidatesForCell(coords, sudoku), new Array(9).fill(false));
    });

    it('indicates that all candidates are viable for a cell with no constraining neighbors', () => {
        const sudoku = SudokuPuzzle.createEmpty();
        const coords = SudokuCoordinates({row: 0, column: 0});
        assert.deepStrictEqual(getViableCandidatesForCell(coords, sudoku), new Array(9).fill(true));
    });

    it('eliminates candidates that are constrained by the cell\'s row', () => {
        const sudoku = SudokuPuzzle.createEmpty();
        sudoku[3][5] = 2;
        sudoku[3][8] = 5;
        const expected = new Array(9).fill(true);
        expected[2 - 1] = false;
        expected[5 - 1] = false;
        const coords = SudokuCoordinates({row: 3, column: 2});
        assert.deepStrictEqual(getViableCandidatesForCell(coords, sudoku), expected);
    });

    it('eliminates candidates that are constrained by the cell\'s column', () => {
        const sudoku = SudokuPuzzle.createEmpty();
        sudoku[1][5] = 9;
        sudoku[2][5] = 3;
        const expected = new Array(9).fill(true);
        expected[9 - 1] = false;
        expected[3 - 1] = false;
        const coords = SudokuCoordinates({row: 3, column: 5});
        assert.deepStrictEqual(getViableCandidatesForCell(coords, sudoku), expected);
    });

    it('eliminates candidates that are constrained by the cell\'s block', () => {
        const sudoku = SudokuPuzzle.createEmpty();
        sudoku[5][7] = 5;
        sudoku[4][8] = 6;
        const expected = new Array(9).fill(true);
        expected[5 - 1] = false;
        expected[6 - 1] = false;
        const coords = SudokuCoordinates({row: 3, column: 6});
        assert.deepStrictEqual(getViableCandidatesForCell(coords, sudoku), expected);
    });
});