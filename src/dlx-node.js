export default function Node({columnIndex, sudokuCell, left = null, right = null, up = null, down = null}) {
    const node = Object.create(Node.prototype);
    node.columnIndex = columnIndex;
    node.sudokuCell = sudokuCell;
    node.left = left;
    node.right = right;
    node.up = up;
    node.down = down;
    return node;
}

Node.prototype = {

}