import assert from 'assert';
import DLXMatrix from '../src/dlx-matrix';
import Node from '../src/dlx-node';

describe('DLXMatrix', () => {
    it('creates a circular header row with the specified number of column headers', () => {
        const matrix = DLXMatrix(3);
        let column = matrix.head;
        for (let i = 0; i <= 3; i++) {
            assert.equal(column.index, i);
            assert.equal(column.right.left, column);
            column = column.right;
        }
        assert.equal(column.index, 0);
    });

    describe('addRow', () => {
        it('adds each node in the given row to the correct column in the matrix', () => {
            const matrix = DLXMatrix(5);
            const node1 = Node({columnIndex: 1});
            const node2 = Node({columnIndex: 4});
            node1.right = node2;
            const row = [node1, node2];
            matrix.addRow(row);
            assert.equal(matrix.head.right.down === node1, true);
            assert.equal(matrix.head.right.right.right.right.down === node2, true);
        });
    });
});