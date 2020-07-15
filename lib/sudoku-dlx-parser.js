'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDLXRowsFromPuzzle = createDLXRowsFromPuzzle;
exports.getViableCandidatesForCell = getViableCandidatesForCell;
exports.createNodeRowFromCell = createNodeRowFromCell;
exports.convertDLXResultsToSudoku = convertDLXResultsToSudoku;

var _sudokuCoordinates = require('./sudoku-coordinates');

var _sudokuCoordinates2 = _interopRequireDefault(_sudokuCoordinates);

var _sudokuCell = require('./sudoku-cell');

var _sudokuCell2 = _interopRequireDefault(_sudokuCell);

var _sudokuPuzzle = require('./sudoku-puzzle');

var _sudokuPuzzle2 = _interopRequireDefault(_sudokuPuzzle);

var _dlxNode = require('./dlx-node');

var _dlxNode2 = _interopRequireDefault(_dlxNode);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDLXRowsFromPuzzle(puzzle) {
    var rows = [];
    puzzle.getRows().forEach(function (row, rowIndex) {
        row.forEach(function (value, colIndex) {
            var coords = (0, _sudokuCoordinates2.default)({
                row: rowIndex,
                column: colIndex,
                puzzleSize: puzzle.size
            });
            var candidates = getViableCandidatesForCell(coords, puzzle);
            candidates.forEach(function (candidate) {
                var sudokuCell = (0, _sudokuCell2.default)({ coords: coords, value: candidate });
                rows.push(createNodeRowFromCell(sudokuCell));
            });
        });
    });
    return rows;
}

function getViableCandidatesForCell(coords, puzzle) {
    if (coords.getValueIn(puzzle) !== 0) {
        return [coords.getValueIn(puzzle)];
    } else {
        var candidates = (0, _util.range)(puzzle.size).map(function (x) {
            return x + 1;
        });
        eliminateFromCandidates(puzzle.getRow(coords.row), candidates);
        eliminateFromCandidates(puzzle.getCol(coords.column), candidates);
        eliminateFromCandidates(puzzle.getBlock(coords.block), candidates);
        return candidates.filter(function (x) {
            return x !== 0;
        });
    }
}

function eliminateFromCandidates(neighborGroup, candidates) {
    neighborGroup.filter(function (cellValue) {
        return cellValue !== 0;
    }).forEach(function (cellValue) {
        return candidates[cellValue - 1] = 0;
    });
}

function createNodeRowFromCell(sudokuCell) {
    var nodes = [(0, _dlxNode2.default)({ columnIndex: sudokuCell.cellConstraintColNum(), sudokuCell: sudokuCell }), (0, _dlxNode2.default)({ columnIndex: sudokuCell.rowConstraintColNum(), sudokuCell: sudokuCell }), (0, _dlxNode2.default)({ columnIndex: sudokuCell.colConstraintColNum(), sudokuCell: sudokuCell }), (0, _dlxNode2.default)({ columnIndex: sudokuCell.blockConstraintColNum(), sudokuCell: sudokuCell })];
    return linkNodes(nodes);
}

function linkNodes(nodes) {
    var curNode = nodes[0];
    for (var i = 0; i < nodes.length; i++) {
        curNode.right = nodes[(i + 1) % nodes.length];
        curNode.right.left = curNode;
        curNode = curNode.right;
    }
    return nodes;
}

function convertDLXResultsToSudoku(dlxResults) {
    return dlxResults.map(function (result) {
        var puzzle = _sudokuPuzzle2.default.createEmpty(result[0].coords.puzzleSize);
        result.forEach(function (cell) {
            return puzzle[cell.coords.row][cell.coords.column] = cell.value;
        });
        return puzzle;
    });
}