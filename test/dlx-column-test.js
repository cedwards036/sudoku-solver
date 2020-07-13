import assert from 'assert';
import Column from '../src/dlx-column';
import Node from '../src/dlx-node';

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
});