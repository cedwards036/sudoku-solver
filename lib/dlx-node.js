'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Node;
function Node(_ref) {
    var columnIndex = _ref.columnIndex,
        sudokuCell = _ref.sudokuCell;

    var node = Object.create(Node.prototype);
    node.columnIndex = columnIndex;
    node.sudokuCell = sudokuCell;
    node.column = null;
    node.left = node;
    node.right = node;
    node.up = node;
    node.down = node;
    return node;
}

Node.prototype = {
    cover: function cover() {
        this.up.down = this.down;
        this.down.up = this.up;
        this.column.size -= 1;
    },
    uncover: function uncover() {
        this.up.down = this;
        this.down.up = this;
        this.column.size += 1;
    },
    traverseRight: function traverseRight(func) {
        this.traverse('right', func);
    },
    traverseLeft: function traverseLeft(func) {
        this.traverse('left', func);
    },
    traverseUp: function traverseUp(func) {
        this.traverse('up', func);
    },
    traverseDown: function traverseDown(func) {
        this.traverse('down', func);
    },
    traverse: function traverse(direction, func) {
        var node = this[direction];
        while (node !== this) {
            func(node);
            node = node[direction];
        }
    }
};