import assert from 'assert';
import validateSudokuInput from '../src/sudoku-validation';

describe('validateSudokuInput', () => {
    it('validates a square n x n array with integer values between 0 and n', () => {
        assert.doesNotThrow(() => {
            validateSudokuInput([
                [1, 0, 2, 0],
                [2, 0, 1, 0],
                [3, 0, 0, 1],
                [4, 0, 3, 0]
            ]);
        })
    });

    it('throws an error if the puzzle is not an array', () => {
        assert.throws(() => {
            validateSudokuInput('not an array');
        }, {
            message: 'Invalid input type: "string". Puzzle must be passed as a 2D array of integers'
        });
    });

    it('throws an error if the puzzle size is not a perfect square greater than 1', () => {
        assert.throws(() => {
            validateSudokuInput([[], [], []]);
        }, {
            message: 'Invalid puzzle size: 3. Puzzles must have a perfect square size greater than 1 (e.g. 4, 9, 16)'
        });
        assert.throws(() => {
            validateSudokuInput([[1]]);
        }, {
            message: 'Invalid puzzle size: 1. Puzzles must have a perfect square size greater than 1 (e.g. 4, 9, 16)'
        });
        assert.throws(() => {
            validateSudokuInput([]);
        }, {
            message: 'Invalid puzzle size: 0. Puzzles must have a perfect square size greater than 1 (e.g. 4, 9, 16)'
        });
    });

    it('throws an error if any puzzle row is not an array', () => {
        assert.throws(() => {
            validateSudokuInput([
                [1, 0, 2, 0],
                '2010',
                [3, 0, 0, 1],
                [4, 0, 3, 0]
            ]);
        }, {
            message: 'Invalid input type: "string". Puzzle must be passed as a 2D array of integers'
        });
    });

    it('throws an error if the puzzle is not a square', () => {
        assert.throws(() => {
            validateSudokuInput([
                [1, 0, 0],
                [1, 0, 0],
                [1, 0, 2],
                [1, 0, 0]
            ]);
        }, {
            message: 'Invalid row length for 4x4 puzzle: 3. Sudoku puzzles must be squares'
        });
    });

    it('throws an error if not all rows are the same width', () => {
        assert.throws(() => {
            validateSudokuInput([
                [1, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 2, 0],
                [1, 0, 0, 0]
            ]);
        }, {
            message: 'Invalid row length for 4x4 puzzle: 9. Sudoku puzzles must be squares'
        });
    });

    it('throws an error if the puzzle contains non-numeric values', () => {
        assert.throws(() => {
            validateSudokuInput([
                [1, 0, 0, 0],
                [1, 0, 'a', 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0]
            ]);
        }, {
            message: 'Invalid symbol "a" in sudoku grid. Grid must only contain integers'
        });
    }); 

    it('throws an error if the puzzle contains non-integer values', () => {
        assert.throws(() => {
            validateSudokuInput([
                [1, 0, 0, 0],
                [1, 0, 1.3, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0]
            ]);
        }, {
            message: 'Invalid symbol "1.3" in sudoku grid. Grid must only contain integers'
        });
    });

    it('throws an error if the puzzle contains an integer bigger than the puzzle side length', () => {
        assert.throws(() => {
            validateSudokuInput([
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 5, 0],
                [1, 0, 0, 0]
            ]);
        }, {
            message: 'Invalid number "5" in 4x4 sudoku grid. Grid must only contain integers between 0 and 4'
        });
    }); 

    it('throws an error if the puzzle contains a negative integer', () => {
        assert.throws(() => {
            validateSudokuInput([
                [-1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 2, 0],
                [1, 0, 0, 0]
            ]);
        }, {
            message: 'Invalid number "-1" in 4x4 sudoku grid. Grid must only contain integers between 0 and 4'
        });
    });
});