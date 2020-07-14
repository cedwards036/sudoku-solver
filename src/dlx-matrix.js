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
    },

    getSmallestColumn() {
        let smallestSize = Infinity;
        let smallestColumn = this.head;
        this.head.traverseRight(column => {
            if (column.size < smallestSize) {
                smallestSize = column.size;
                smallestColumn = column;
            }
        });
        return smallestColumn;
    },

    solve() {
        const solutions = [];
        this.search(solutions, []);
        return solutions.map(solution => solution.map(node => node.sudokuCell));
    },

    search(solutions, currentSolution) {
        if (solutions.length < 2) {
            if (this.head.right === this.head) {
                solutions.push(currentSolution.slice());
            } else {
                const column = this.getSmallestColumn();
                column.cover();
                column.traverseDown(node => {
                    currentSolution.push(node);
                    node.traverseRight(siblingNode => {
                        siblingNode.column.cover();
                    });
                    this.search(solutions, currentSolution);
                    node = currentSolution.pop();
                    node.traverseLeft(siblingNode => {
                        siblingNode.column.uncover();
                    });
                });
                column.uncover();
            }
        } 
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