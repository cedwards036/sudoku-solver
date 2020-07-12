import Column from './dlx-column';

export default function DLXMatrix(numberOfColumns) {
    const matrix = Object.create(DLXMatrix.prototype);
    matrix.head = Column({index: 0});
    addColumns(matrix.head, numberOfColumns);
    return matrix;
}

DLXMatrix.prototype = {

}

function addColumns(headColumn, numberOfColumns) {
    let column = headColumn;
    for (let i = 1; i < numberOfColumns; i++) {
        column.right = Column({index: i});
        column = column.right;
    }
    column.right = headColumn;
}