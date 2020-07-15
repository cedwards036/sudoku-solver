import validateSudokuInput from './sudoku-validation';
import * as SudokuSolver from './sudoku-solver';

export function solveClassicSudoku(puzzle) {
    validateSudokuInput(puzzle);
    const solutions = SudokuSolver.solveClassicSudoku(puzzle);
    return solutions.map(sudokuPuzzle => sudokuPuzzle.getRows());
}