'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Column;

var _dlxNode = require('./dlx-node');

var _dlxNode2 = _interopRequireDefault(_dlxNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Column(_ref) {
    var index = _ref.index,
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 0 : _ref$size;

    var column = Object.create(Column.prototype);
    column.index = index;
    column.size = size;
    column.left = column;
    column.right = column;
    column.up = column;
    column.down = column;
    return column;
}

Column.prototype = Object.create(_dlxNode2.default.prototype);

Column.prototype.addNode = function (node) {
    this.up.down = node;
    node.up = this.up;
    this.up = node;
    node.down = this;
    node.column = this;
    this.size++;
};

Column.prototype.cover = function () {
    this.right.left = this.left;
    this.left.right = this.right;
    this.traverseDown(function (node) {
        node.traverseRight(function (siblingNode) {
            siblingNode.cover();
        });
    });
};

Column.prototype.uncover = function () {
    this.traverseUp(function (node) {
        node.traverseLeft(function (siblingNode) {
            siblingNode.uncover();
        });
    });
    this.right.left = this;
    this.left.right = this;
};