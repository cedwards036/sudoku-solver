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

}