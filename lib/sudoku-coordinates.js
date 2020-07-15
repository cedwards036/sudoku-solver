"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SudokuCoordinates;
function SudokuCoordinates(_ref) {
    var row = _ref.row,
        column = _ref.column,
        _ref$puzzleSize = _ref.puzzleSize,
        puzzleSize = _ref$puzzleSize === undefined ? 9 : _ref$puzzleSize;

    var coords = Object.create(SudokuCoordinates.prototype);
    coords.row = row;
    coords.column = column;
    coords.block = calculateBlockFromRowAndCol(row, column, puzzleSize);
    coords.puzzleSize = puzzleSize;
    return coords;
}

function calculateBlockFromRowAndCol(row, column, puzzleSize) {
    var blockSize = Math.sqrt(puzzleSize);
    return Math.floor(row / blockSize) * blockSize + Math.floor(column / blockSize);
}

SudokuCoordinates.prototype = {
    getValueIn: function getValueIn(puzzle) {
        return puzzle[this.row][this.column];
    }
};