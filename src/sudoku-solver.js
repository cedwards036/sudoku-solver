import SudokuPuzzle from './sudoku-puzzle';
import {createDLXRowsFromPuzzle, convertDLXResultsToSudoku} from './sudoku-dlx-parser';
import DLXMatrix from './dlx-matrix';

const NUMBER_OF_CONSTRAINTS = 4;

export function solveClassicSudoku(puzzle) {
    const sudokuPuzzle = SudokuPuzzle(puzzle)
    const dlxRows = createDLXRowsFromPuzzle(sudokuPuzzle);
    const matrix = DLXMatrix(sudokuPuzzle.size ** 2 * NUMBER_OF_CONSTRAINTS);
    dlxRows.forEach(row => matrix.addRow(row));
    return convertDLXResultsToSudoku(matrix.solve());
}