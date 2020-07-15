import validateSudokuInput from './src/sudoku-validation';
import * as SudokuSolver from './src/sudoku-solver';

export function solveClassicSudoku(puzzle) {
    validateSudokuInput(puzzle);
    const solutions = SudokuSolver.solveClassicSudoku(puzzle);
    return solutions.map(sudokuPuzzle => sudokuPuzzle.getRows());
}