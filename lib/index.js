'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.solveClassicSudoku = solveClassicSudoku;

var _sudokuValidation = require('./sudoku-validation');

var _sudokuValidation2 = _interopRequireDefault(_sudokuValidation);

var _sudokuSolver = require('./sudoku-solver');

var SudokuSolver = _interopRequireWildcard(_sudokuSolver);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function solveClassicSudoku(puzzle) {
    (0, _sudokuValidation2.default)(puzzle);
    var solutions = SudokuSolver.solveClassicSudoku(puzzle);
    return solutions.map(function (sudokuPuzzle) {
        return sudokuPuzzle.getRows();
    });
}