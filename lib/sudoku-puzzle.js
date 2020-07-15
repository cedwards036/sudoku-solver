'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SudokuPuzzle;

var _util = require('./util');

function SudokuPuzzle(puzzleGrid) {
    var puzzle = Object.create(SudokuPuzzle.prototype);
    puzzleGrid.forEach(function (row, index) {
        return puzzle[index] = row;
    });
    puzzle.size = puzzleGrid.length;
    puzzle.blockSize = Math.sqrt(puzzle.size);
    return puzzle;
}

SudokuPuzzle.createEmpty = function () {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9;

    var emptyPuzzle = new Array(size).fill().map(function () {
        return new Array(size).fill(0);
    });
    return SudokuPuzzle(emptyPuzzle);
};

SudokuPuzzle.prototype = {
    getRow: function getRow(rowIndex) {
        return this[rowIndex];
    },
    getRows: function getRows() {
        var _this = this;

        return (0, _util.range)(this.size).map(function (i) {
            return _this[i];
        });
    },
    getCol: function getCol(colIndex) {
        var _this2 = this;

        return (0, _util.range)(this.size).map(function (row) {
            return _this2[row][colIndex];
        });
    },
    getBlock: function getBlock(blockIndex) {
        var block = [];
        var startingRow = Math.floor(blockIndex / this.blockSize) * this.blockSize;
        var startingCol = blockIndex % this.blockSize * this.blockSize;
        for (var row = startingRow; row < startingRow + this.blockSize; row++) {
            for (var col = startingCol; col < startingCol + this.blockSize; col++) {
                block.push(this[row][col]);
            }
        }
        return block;
    }
};