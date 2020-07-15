'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = DLXMatrix;

var _dlxColumn = require('./dlx-column');

var _dlxColumn2 = _interopRequireDefault(_dlxColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DLXMatrix(numberOfColumns) {
    var matrix = Object.create(DLXMatrix.prototype);
    matrix.head = (0, _dlxColumn2.default)({ index: 0 });
    addColumns(matrix.head, numberOfColumns);
    return matrix;
}

DLXMatrix.prototype = {
    addRow: function addRow(row) {
        var node = row[0];
        this.head.traverseRight(function (column) {
            if (column.index === node.columnIndex) {
                column.addNode(node);
                node = node.right;
            }
        });
    },
    getSmallestColumn: function getSmallestColumn() {
        var smallestSize = Infinity;
        var smallestColumn = this.head;
        this.head.traverseRight(function (column) {
            if (column.size < smallestSize) {
                smallestSize = column.size;
                smallestColumn = column;
            }
        });
        return smallestColumn;
    },
    solve: function solve() {
        var solutions = [];
        this.search(solutions, []);
        return solutions.map(function (solution) {
            return solution.map(function (node) {
                return node.sudokuCell;
            });
        });
    },
    search: function search(solutions, currentSolution) {
        var _this = this;

        if (solutions.length < 2) {
            if (this.head.right === this.head && currentSolution.length > 0) {
                solutions.push(currentSolution.slice());
            } else {
                var column = this.getSmallestColumn();
                column.cover();
                column.traverseDown(function (node) {
                    currentSolution.push(node);
                    node.traverseRight(function (siblingNode) {
                        siblingNode.column.cover();
                    });
                    _this.search(solutions, currentSolution);
                    node = currentSolution.pop();
                    node.traverseLeft(function (siblingNode) {
                        siblingNode.column.uncover();
                    });
                });
                column.uncover();
            }
        }
    }
};

function addColumns(headColumn, numberOfColumns) {
    var column = headColumn;
    for (var i = 1; i <= numberOfColumns; i++) {
        column.right = (0, _dlxColumn2.default)({ index: i });
        column.right.left = column;
        column = column.right;
    }
    column.right = headColumn;
    headColumn.left = column;
}