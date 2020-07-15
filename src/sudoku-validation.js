export default function validateSudokuInput(sudoku) {
    validateInputType(sudoku);
    const puzzleSize = sudoku.length;
    validateSudokuSize(puzzleSize);
    sudoku.forEach(row => validateSudokuRow(row, puzzleSize));
}

function validateInputType(input) {
    if (!Array.isArray(input)) {
        throw new SudokuError(`Invalid input type: "${typeof input}". Puzzle must be passed as a 2D array of integers`);
    }
}

function validateSudokuSize(size) {
    if (!isPerfectSquareGreaterThanOne(size)) {
        throw new SudokuError(`Invalid puzzle size: ${size}. Puzzles must have a perfect square size greater than 1 (e.g. 4, 9, 16)`)
    }
}

function validateSudokuRow(row, puzzleSize) {
    validateInputType(row);
    if (row.length !== puzzleSize) {
        throw new SudokuError(`Invalid row length for ${puzzleSize}x${puzzleSize} puzzle: ${row.length}. Sudoku puzzles must be squares`);
    }
    row.forEach(value => validateSudokuValue(value, puzzleSize));
}

function validateSudokuValue(value, puzzleSize) {
    if (!isInteger(value)) {
        throw new SudokuError(`Invalid symbol "${value}" in sudoku grid. Grid must only contain integers`);
    } else if (value > puzzleSize || value < 0) {
        throw new SudokuError(`Invalid number "${value}" in ${puzzleSize}x${puzzleSize} sudoku grid. ` + 
                            `Grid must only contain integers between 0 and ${puzzleSize}`);
    }
}

//thanks to https://stackoverflow.com/a/14794066/8048369
function isInteger(value) {
    if (typeof value !== 'number' || isNaN(value)) {
        return false;
    } else {
        let x = parseFloat(value);
        return (x | 0) === x;
    }
}

function isPerfectSquareGreaterThanOne(value) {
    return isInteger(Math.sqrt(value)) && value > 1;
}

class SudokuError extends Error {};