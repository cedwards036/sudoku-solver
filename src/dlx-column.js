import Node from './dlx-node';

export default function Column({index, size = 0}) {
    const column = Object.create(Column.prototype);
    column.index = index;
    column.size = size;
    column.left = column;
    column.right = column;
    column.up = column;
    column.down = column;
    return column;
}

Column.prototype = Object.create(Node.prototype);

Column.prototype.addNode = function(node) {
    this.up.down = node;
    node.up = this.up;
    this.up = node;
    node.down = this;
    node.column = this;
    this.size++;
}

Column.prototype.cover = function() {
    this.right.left = this.left;
    this.left.right = this.right;
    this.traverseDown(node => {
        node.traverseRight(siblingNode => {
            siblingNode.cover();
        });
    });
}

Column.prototype.uncover = function() {
    this.traverseUp(node => {
        node.traverseLeft(siblingNode => {
            siblingNode.uncover();
        });
    });
    this.right.left = this;
    this.left.right = this;
}