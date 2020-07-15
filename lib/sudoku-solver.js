'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.solveClassicSudoku = solveClassicSudoku;

var _sudokuPuzzle = require('./sudoku-puzzle');

var _sudokuPuzzle2 = _interopRequireDefault(_sudokuPuzzle);

var _sudokuDlxParser = require('./sudoku-dlx-parser');

var _dlxMatrix = require('./dlx-matrix');

var _dlxMatrix2 = _interopRequireDefault(_dlxMatrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NUMBER_OF_CONSTRAINTS = 4;

function solveClassicSudoku(puzzle) {
    var sudokuPuzzle = (0, _sudokuPuzzle2.default)(puzzle);
    var dlxRows = (0, _sudokuDlxParser.createDLXRowsFromPuzzle)(sudokuPuzzle);
    var matrix = (0, _dlxMatrix2.default)(sudokuPuzzle.size ** 2 * NUMBER_OF_CONSTRAINTS);
    dlxRows.forEach(function (row) {
        return matrix.addRow(row);
    });
    return (0, _sudokuDlxParser.convertDLXResultsToSudoku)(matrix.solve());
}