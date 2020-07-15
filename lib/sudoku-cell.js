"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SudokuCell;

var _sudokuCoordinates = require("./sudoku-coordinates");

var _sudokuCoordinates2 = _interopRequireDefault(_sudokuCoordinates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DLX_COLUMN_GROUP_ORDER = {
    CELL_CONSTRAINT: 0,
    ROW_CONSTRAINT: 1,
    COL_CONSTRAINT: 2,
    BLOCK_CONSTRAINT: 3
};

function SudokuCell(_ref) {
    var coords = _ref.coords,
        value = _ref.value;

    var cell = Object.create(SudokuCell.prototype);
    cell.coords = coords;
    cell.value = value;
    return cell;
}

SudokuCell.fromMatrixRowNum = function (rowNum) {
    var puzzleSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;

    var row = Math.floor(rowNum / puzzleSize ** 2);
    var col = Math.floor((rowNum - row * puzzleSize ** 2) / puzzleSize);
    return SudokuCell({
        coords: (0, _sudokuCoordinates2.default)({
            row: row,
            column: col,
            puzzleSize: puzzleSize
        }),
        value: rowNum % puzzleSize + 1
    });
};

SudokuCell.prototype = {
    matrixRowNum: function matrixRowNum() {
        return this.coords.row * this.coords.puzzleSize ** 2 + this.coords.column * this.coords.puzzleSize + this.value - 1;
    },
    cellConstraintColNum: function cellConstraintColNum() {
        return this.coords.puzzleSize ** 2 * DLX_COLUMN_GROUP_ORDER.CELL_CONSTRAINT + this.coords.row * this.coords.puzzleSize + this.coords.column + 1;
    },
    rowConstraintColNum: function rowConstraintColNum() {
        return this.coords.puzzleSize ** 2 * DLX_COLUMN_GROUP_ORDER.ROW_CONSTRAINT + this.coords.row * this.coords.puzzleSize + this.value;
    },
    colConstraintColNum: function colConstraintColNum() {
        return this.coords.puzzleSize ** 2 * DLX_COLUMN_GROUP_ORDER.COL_CONSTRAINT + this.coords.column * this.coords.puzzleSize + this.value;
    },
    blockConstraintColNum: function blockConstraintColNum() {
        return this.coords.puzzleSize ** 2 * DLX_COLUMN_GROUP_ORDER.BLOCK_CONSTRAINT + this.coords.block * this.coords.puzzleSize + this.value;
    }
};