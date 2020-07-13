export default function Node({columnIndex, sudokuCell}) {
    const node = Object.create(Node.prototype);
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
    cover() {
        this.up.down = this.down;
        this.down.up = this.up;
        this.column.size -= 1;
    },

    uncover() {
        this.up.down = this;
        this.down.up = this;
        this.column.size += 1;
    },

    traverseRight(func) { 
        this.traverse('right', func);
    },

    traverseLeft(func) {
        this.traverse('left', func);
    },

    traverseUp(func) {
        this.traverse('up', func);
    }, 

    traverseDown(func) {
        this.traverse('down', func);
    }, 

    traverse(direction, func) {
        let node = this[direction];
        while (node !== this) {
            func(node);
            node = node[direction];
        }
    }
}