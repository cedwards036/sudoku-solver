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

Column.prototype = {
    addNode(node) {
        this.up.down = node;
        node.up = this.up;
        this.up = node;
        node.down = this;
        node.column = this;
        this.size++;
    }
}