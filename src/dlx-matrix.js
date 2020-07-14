import Column from './dlx-column';

export default function DLXMatrix(numberOfColumns) {
    const matrix = Object.create(DLXMatrix.prototype);
    matrix.head = Column({index: 0});
    addColumns(matrix.head, numberOfColumns);
    return matrix;
}

DLXMatrix.prototype = {
    addRow(row) {
        let node = row[0];
        this.head.traverseRight((column) => {
            if (column.index === node.columnIndex) {
                column.addNode(node);
                node = node.right;
            }
        });
    }
}

function addColumns(headColumn, numberOfColumns) {
    let column = headColumn;
    for (let i = 1; i <= numberOfColumns; i++) {
        column.right = Column({index: i});
        column.right.left = column;
        column = column.right;
    }
    column.right = headColumn;
    headColumn.left = column;
}