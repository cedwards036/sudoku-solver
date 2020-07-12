import assert from 'assert';
import SudokuCoordinates from '../src/sudoku-coordinates';
import {getViableCandidatesForCell, createNodeRowFromCell, createDLXRowsFromPuzzle} from '../src/sudoku-dlx-parser';
import SudokuPuzzle from '../src/sudoku-puzzle';
import SudokuCell from '../src/sudoku-cell';

describe('getViableCandidatesForCell', () => {
    it('indicates that all candidates are viable for a cell with no constraining neighbors', () => {
        const sudoku = SudokuPuzzle.createEmpty();
        const coords = SudokuCoordinates({row: 0, column: 0});
        const expected = [1,2,3,4,5,6,7,8,9];
        assert.deepStrictEqual(getViableCandidatesForCell(coords, sudoku), expected);
    });

    it('eliminates all candidates except the cell value for a filled-in cell', () => {
        const sudoku = SudokuPuzzle.createEmpty();
        sudoku[0][0] = 1;
        const expected = [1];
        const coords = SudokuCoordinates({row: 0, column: 0});
        assert.deepStrictEqual(getViableCandidatesForCell(coords, sudoku), expected);
    });

    it('eliminates candidates that are constrained by the cell\'s row', () => {
        const sudoku = SudokuPuzzle.createEmpty();
        sudoku[3][5] = 2;
        sudoku[3][8] = 5;
        const expected = [1,3,4,6,7,8,9];
        const coords = SudokuCoordinates({row: 3, column: 2});
        assert.deepStrictEqual(getViableCandidatesForCell(coords, sudoku), expected);
    });

    it('eliminates candidates that are constrained by the cell\'s column', () => {
        const sudoku = SudokuPuzzle.createEmpty();
        sudoku[1][5] = 9;
        sudoku[2][5] = 3;
        const expected = [1,2,4,5,6,7,8];
        const coords = SudokuCoordinates({row: 3, column: 5});
        assert.deepStrictEqual(getViableCandidatesForCell(coords, sudoku), expected);
    });

    it('eliminates candidates that are constrained by the cell\'s block', () => {
        const sudoku = SudokuPuzzle.createEmpty();
        sudoku[5][7] = 5;
        sudoku[4][8] = 6;
        const expected = [1,2,3,4,7,8,9];
        const coords = SudokuCoordinates({row: 3, column: 6});
        assert.deepStrictEqual(getViableCandidatesForCell(coords, sudoku), expected);
    });
});

describe('createNodeRowFromCell', () => {
    it('creates one node for each constraint column group', () => {
        const coords = SudokuCoordinates({row: 2, column: 5});
        const cell = SudokuCell({coords: coords, value: 9});
        const result = createNodeRowFromCell(cell);
        assert.equal(result.length, 4);
        assert.equal(result[0].columnIndex, 24);
        assert.equal(result[0].sudokuCell, cell);
        assert.equal(result[1].columnIndex, 108);
        assert.equal(result[1].sudokuCell, cell);
        assert.equal(result[2].columnIndex, 216);
        assert.equal(result[2].sudokuCell, cell);
        assert.equal(result[3].columnIndex, 261);
        assert.equal(result[3].sudokuCell, cell);
    });

    it('links the resulting nodes into a circular, doubly-linked structure', () => {
        const coords = SudokuCoordinates({row: 2, column: 5});
        const cell = SudokuCell({coords: coords, value: 9});
        const result = createNodeRowFromCell(cell);
        let node = result[0];
        for (let i = 0; i < 4; i++) {
            assert.deepStrictEqual(node.right.left, node);
            node = node.right;
        }
    });
});

describe('createDLXRowsFromPuzzle', () => {
    it('creates an array of node rows representing possible row/column/value combinations in the puzzle', () => {
        const puzzle = SudokuPuzzle([
            [2, 1, 0, 0],
            [0, 3, 2, 0],
            [0, 0, 0, 4],
            [1, 0, 0, 0]
        ]);
        const result = createDLXRowsFromPuzzle(puzzle);
        assert.equal(result.length, 20);
        assert.deepStrictEqual(result[0], createNodeRowFromCell(SudokuCell({
            coords: SudokuCoordinates({row: 0, column: 0, puzzleSize: 4}), 
            value: 2
        })));
        assert.deepStrictEqual(result[1], createNodeRowFromCell(SudokuCell({
            coords: SudokuCoordinates({row: 0, column: 1, puzzleSize: 4}), 
            value: 1
        })));
        assert.deepStrictEqual(result[2], createNodeRowFromCell(SudokuCell({
            coords: SudokuCoordinates({row: 0, column: 2, puzzleSize: 4}), 
            value: 3
        })));
        assert.deepStrictEqual(result[3], createNodeRowFromCell(SudokuCell({
            coords: SudokuCoordinates({row: 0, column: 2, puzzleSize: 4}), 
            value: 4
        })));
    });
});