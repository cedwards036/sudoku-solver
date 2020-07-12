import assert from 'assert';
import SudokuCell from '../src/sudoku-cell';
import SudokuCoordinates from '../src/sudoku-coordinates';

describe('SudokuCell', () => {

    describe('fromMatrixRowNum', () => {
        it('creates the sudoku cell that maps to the nth row of the DLX matrix', () => {
            const firstRowCell = SudokuCell({coords: SudokuCoordinates({row: 0, column: 0}), value: 1});
            assert.deepStrictEqual(SudokuCell.fromMatrixRowNum(0), firstRowCell);

            const middleRowCell = SudokuCell({coords: SudokuCoordinates({row: 2, column: 3}), value: 4});
            assert.deepStrictEqual(SudokuCell.fromMatrixRowNum(81*2+9*3+4-1), middleRowCell);

            const lastRowCell = SudokuCell({coords: SudokuCoordinates({row: 8, column: 8}), value: 9});
            assert.deepStrictEqual(SudokuCell.fromMatrixRowNum(9*9*9-1), lastRowCell);
        });
    });

    describe('matrixRowNum', () => {
        it('returns the DLX matrix row number that corresponds to the sudoku cell', () => {
            const firstRowCell = SudokuCell({coords: SudokuCoordinates({row: 0, column: 0}), value: 1});
            assert.deepStrictEqual(firstRowCell.matrixRowNum(), 0);

            const middleRowCell = SudokuCell({coords: SudokuCoordinates({row: 2, column: 3}), value: 4});
            assert.deepStrictEqual(middleRowCell.matrixRowNum(), 81*2+9*3+4-1);

            const lastRowCell = SudokuCell({coords: SudokuCoordinates({row: 8, column: 8}), value: 9});
            assert.deepStrictEqual(lastRowCell.matrixRowNum(), 9*9*9-1);
        });
    });

    describe('cellConstraintColNum', () => {
        it('returns the DLX matrix column number corresponding to the "one number in cell" constraint', () => {
            const firstRowCell = SudokuCell({coords: SudokuCoordinates({row: 0, column: 0}), value: 1});
            assert.deepStrictEqual(firstRowCell.cellConstraintColNum(), 0);

            const middleRowCell = SudokuCell({coords: SudokuCoordinates({row: 2, column: 3}), value: 5});
            assert.deepStrictEqual(middleRowCell.cellConstraintColNum(), 9*2+4-1);

            const lastRowCell = SudokuCell({coords: SudokuCoordinates({row: 8, column: 8}), value: 9});
            assert.deepStrictEqual(lastRowCell.cellConstraintColNum(), 9*9-1);
        });
    });

    describe('rowConstraintColNum', () => {
        it('returns the DLX matrix column number corresponding to the row constraint', () => {
            const firstRowCell = SudokuCell({coords: SudokuCoordinates({row: 0, column: 0}), value: 1});
            assert.deepStrictEqual(firstRowCell.rowConstraintColNum(), 9*9+0);

            const middleRowCell = SudokuCell({coords: SudokuCoordinates({row: 2, column: 3}), value: 5});
            assert.deepStrictEqual(middleRowCell.rowConstraintColNum(), 9*9+9*2+5-1);

            const lastRowCell = SudokuCell({coords: SudokuCoordinates({row: 8, column: 8}), value: 9});
            assert.deepStrictEqual(lastRowCell.rowConstraintColNum(), 9*9+9*9-1);
        });
    });

    describe('colConstraintColNum', () => {
        it('returns the DLX matrix column number corresponding to the column constraint', () => {
            const firstRowCell = SudokuCell({coords: SudokuCoordinates({row: 0, column: 0}), value: 1});
            assert.deepStrictEqual(firstRowCell.colConstraintColNum(), 9*9*2+0);

            const middleRowCell = SudokuCell({coords: SudokuCoordinates({row: 2, column: 3}), value: 5});
            assert.deepStrictEqual(middleRowCell.colConstraintColNum(), 9*9*2+9*3+5-1);

            const lastRowCell = SudokuCell({coords: SudokuCoordinates({row: 8, column: 8}), value: 9});
            assert.deepStrictEqual(lastRowCell.colConstraintColNum(), 9*9*2+9*9-1);
        });
    });

    describe('blockConstraintColNum', () => {
        it('returns the DLX matrix column number corresponding to the block constraint', () => {
            const firstRowCell = SudokuCell({coords: SudokuCoordinates({row: 0, column: 0}), value: 1});
            assert.deepStrictEqual(firstRowCell.blockConstraintColNum(), 9*9*3+0);

            const middleRowCell = SudokuCell({coords: SudokuCoordinates({row: 2, column: 3}), value: 5});
            assert.deepStrictEqual(middleRowCell.blockConstraintColNum(), 9*9*3+9*1+5-1);

            const lastRowCell = SudokuCell({coords: SudokuCoordinates({row: 8, column: 8}), value: 9});
            assert.deepStrictEqual(lastRowCell.blockConstraintColNum(), 9*9*3+9*9-1);
        });
    });
});