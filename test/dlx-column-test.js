import assert from 'assert';
import Column from '../src/dlx-column';
import Node from '../src/dlx-node';
import DLXMatrix from '../src/dlx-matrix';

describe('DLX Column', () => {
    it('initializes with all of its pointers pointing at itself', () => {
        const column = Column({index: 0});
        assert.equal(column.left, column);
        assert.equal(column.right, column);
        assert.equal(column.up, column);
        assert.equal(column.down, column);
    });

    describe('addNode', () => {
        it('increments the column size', () => {
            const column = Column({index: 0});
            column.addNode(Node(0));
            assert.equal(column.size, 1);
            column.addNode(Node(0));
            assert.equal(column.size, 2);
        });

        it('adds the node to the end of the column, updating all necessary 2-way links', () => {
            const column = Column({index: 0});
            const node1 = Node(0);
            column.addNode(node1);
            assert.equal(column.up, node1);
            assert.equal(column.down, node1);
            assert.equal(node1.up, column);
            assert.equal(node1.down, column);
            assert.equal(node1.column, column);
            
            const node2 = Node(0);
            column.addNode(node2);
            assert.equal(column.up, node2);
            assert.equal(column.down.down, node2);
            assert.equal(node1.up, column);
            assert.equal(node1.down, node2);
            assert.equal(node2.up, node1);
            assert.equal(node2.down, column);
            assert.equal(node2.column, column);
        });
    });

    describe('cover', () => {
        it('removes the column from the header row while keeping the column\'s left/right references intact', () => {
            const matrix = DLXMatrix(3);
            const column = matrix.head.right;
            column.cover();
            assert.equal(matrix.head.right, column.right);
            assert.equal(column.right.left, matrix.head);
            assert.equal(column.left, matrix.head);
        });

        it('covers all of the column\'s nodes\' siblings', () => {
            const matrix = create3x2Matrix();
            const column = matrix.head.right.right;
            column.cover();
            assert.equal(matrix.head.right.size, 0);
            assert.equal(matrix.head.right.down, matrix.head.right);
            assert.equal(matrix.head.right.right.size, 0);
            assert.equal(matrix.head.right.right.down, matrix.head.right.right);
        });
    });

    describe('uncover', () => {
        it('restores the column back into the header row', () => {
            const matrix = DLXMatrix(3);
            const column = matrix.head.right;
            column.cover();
            column.uncover();
            assert.equal(matrix.head.right, column);
            assert.equal(column.right.left, column);
        });

        it('uncovers all of the column\'s nodes\' siblings', () => {
            const matrix = create3x2Matrix();
            const column = matrix.head.right.right;
            column.cover();
            column.uncover();
            assert.equal(matrix.head.right.size, 2);
            assert.equal(matrix.head.right.right.size, 2);
            assert.equal(matrix.head.right.right.right.size, 2);
        });
    });
});

function create3x2Matrix() {
    const matrix = DLXMatrix(3);

    const node1Row1 = Node({columnIndex: 1});
    const node2Row1 = Node({columnIndex: 2});
    const node3Row1 = Node({columnIndex: 3});
    node1Row1.right = node2Row1;
    node2Row1.right = node3Row1;
    node3Row1.right = node1Row1;
    node1Row1.left = node3Row1;
    node2Row1.left = node1Row1;
    node3Row1.left = node2Row1;
    const row1 = [node1Row1, node2Row1, node3Row1];

    const node1Row2 = Node({columnIndex: 1});
    const node2Row2 = Node({columnIndex: 2});
    const node3Row2 = Node({columnIndex: 3});
    node1Row2.right = node2Row2;
    node2Row2.right = node3Row2;
    node3Row2.right = node1Row2;
    node1Row2.left = node3Row2;
    node2Row2.left = node1Row2;
    node3Row2.left = node2Row2;
    const row2 = [node1Row2, node2Row2, node3Row2];

    matrix.addRow(row1);
    matrix.addRow(row2);

    return matrix;
}