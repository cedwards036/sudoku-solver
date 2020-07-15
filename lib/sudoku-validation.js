'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = validateSudokuInput;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function validateSudokuInput(sudoku) {
    validateInputType(sudoku);
    var puzzleSize = sudoku.length;
    validateSudokuSize(puzzleSize);
    sudoku.forEach(function (row) {
        return validateSudokuRow(row, puzzleSize);
    });
}

function validateInputType(input) {
    if (!Array.isArray(input)) {
        throw new SudokuError('Invalid input type: "' + (typeof input === 'undefined' ? 'undefined' : _typeof(input)) + '". Puzzle must be passed as a 2D array of integers');
    }
}

function validateSudokuSize(size) {
    if (!isPerfectSquareGreaterThanOne(size)) {
        throw new SudokuError('Invalid puzzle size: ' + size + '. Puzzles must have a perfect square size greater than 1 (e.g. 4, 9, 16)');
    }
}

function validateSudokuRow(row, puzzleSize) {
    validateInputType(row);
    if (row.length !== puzzleSize) {
        throw new SudokuError('Invalid row length for ' + puzzleSize + 'x' + puzzleSize + ' puzzle: ' + row.length + '. Sudoku puzzles must be squares');
    }
    row.forEach(function (value) {
        return validateSudokuValue(value, puzzleSize);
    });
}

function validateSudokuValue(value, puzzleSize) {
    if (!isInteger(value)) {
        throw new SudokuError('Invalid symbol "' + value + '" in sudoku grid. Grid must only contain integers');
    } else if (value > puzzleSize || value < 0) {
        throw new SudokuError('Invalid number "' + value + '" in ' + puzzleSize + 'x' + puzzleSize + ' sudoku grid. ' + ('Grid must only contain integers between 0 and ' + puzzleSize));
    }
}

//thanks to https://stackoverflow.com/a/14794066/8048369
function isInteger(value) {
    if (typeof value !== 'number' || isNaN(value)) {
        return false;
    } else {
        var x = parseFloat(value);
        return (x | 0) === x;
    }
}

function isPerfectSquareGreaterThanOne(value) {
    return isInteger(Math.sqrt(value)) && value > 1;
}

var SudokuError = function (_Error) {
    _inherits(SudokuError, _Error);

    function SudokuError() {
        _classCallCheck(this, SudokuError);

        return _possibleConstructorReturn(this, (SudokuError.__proto__ || Object.getPrototypeOf(SudokuError)).apply(this, arguments));
    }

    return SudokuError;
}(Error);

;