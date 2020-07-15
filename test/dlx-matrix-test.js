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

    describe('getSmallestColumn', () => {
        it('returns a reference to the column with the smallest size in the matrix', () => {
            const matrix = DLXMatrix(3);
            const node1 = Node({columnIndex: 1});
            const node2 = Node({columnIndex: 3});
            node1.right = node2;
            const row = [node1, node2];
            matrix.addRow(row);
            assert.equal(matrix.getSmallestColumn(), matrix.head.right.right);
        });
    });

    describe('solve', () => {
        describe('when there are no solutions', () => {
            it('because the matrix is empty', () => {
                const matrix = DLXMatrix(0);
                assert.deepStrictEqual(matrix.solve(), []);
            });

            it('because the matrix has at least one empty column', () => {
                const matrix = DLXMatrix(2);
                matrix.addRow([Node({columnIndex: 1, sudokuCell: 'cell1'})])
                assert.deepStrictEqual(matrix.solve(), []);
            });

            it('because the matrix has contradictory columns', () => {
                const matrix = DLXMatrix(3);
                const node1Row1 = Node({columnIndex: 1});
                const node2Row1 = Node({columnIndex: 2});
                node1Row1.right = node2Row1;
                node2Row1.right = node1Row1;
                node1Row1.left = node2Row1;
                node2Row1.left = node1Row1;
                const row1 = [node1Row1, node2Row1];
            
                const node1Row2 = Node({columnIndex: 1});
                const node2Row2 = Node({columnIndex: 3});
                node1Row2.right = node2Row2;
                node2Row2.right = node1Row2;
                node1Row2.left = node2Row2;
                node2Row2.left = node1Row2;
                const row2 = [node1Row2, node2Row2];
            
                matrix.addRow(row1);
                matrix.addRow(row2);
                assert.deepStrictEqual(matrix.solve(), []);
            });            
        });

        it('returns a 2D array with one element--a solution node array--if the matrix has a unique solution', () => {
            const matrix = DLXMatrix(3);

            const node1Row1 = Node({columnIndex: 1, sudokuCell: 'cell1'});
            const row1 = [node1Row1];
        
            const node1Row2 = Node({columnIndex: 2, sudokuCell: 'cell2'});
            const node2Row2 = Node({columnIndex: 3, sudokuCell: 'cell2'});
            node1Row2.right = node2Row2;
            node2Row2.right = node1Row2;
            node1Row2.left = node2Row2;
            node2Row2.left = node1Row2;
            const row2 = [node1Row2, node2Row2];
        
            matrix.addRow(row1);
            matrix.addRow(row2);

            assert.deepStrictEqual(matrix.solve(), [['cell1', 'cell2']]);
        });

        it('returns a 2D array with at most two solution arrays if the matrix has multiple solutions', () => {
            const matrix = DLXMatrix(3);
        
            const row1 = [Node({columnIndex: 1, sudokuCell: 'cell1'})];
        
            const node1Row2 = Node({columnIndex: 2, sudokuCell: 'cell2'});
            const node2Row2 = Node({columnIndex: 3, sudokuCell: 'cell2'});
            node1Row2.right = node2Row2;
            node2Row2.right = node1Row2;
            node1Row2.left = node2Row2;
            node2Row2.left = node1Row2;
            const row2 = [node1Row2, node2Row2];

            const row3 = [Node({columnIndex: 1, sudokuCell: 'cell3'})];
            const row4 = [Node({columnIndex: 1, sudokuCell: 'cell4'})];
        
            matrix.addRow(row1);
            matrix.addRow(row2);
            matrix.addRow(row3);
            matrix.addRow(row4);

            assert.deepStrictEqual(matrix.solve(), [['cell2', 'cell1'], ['cell2', 'cell3']]);
        });
    });
});