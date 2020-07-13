import assert from 'assert';
import Node from '../src/dlx-node';
import Column from '../src/dlx-column';

describe('Node', () => {
    describe('cover', () => {
        it('removes itself from its column without losing its own up/down references', () => {
            const column = Column({index: 0});
            const node1 = Node({columnIndex: 0});
            const node2 = Node({columnIndex: 0});
            column.addNode(node1);
            column.addNode(node2);
            node1.cover();
            assert.equal(column.down, node2);
            assert.equal(node2.up, column);
            assert.equal(node1.up, column);
            assert.equal(node1.down, node2);
            assert.equal(column.size, 1);
        });
    });

    describe('uncover', () => {
        it('reinserts itself into its column', () => {
            const column = Column({index: 0});
            const node1 = Node({columnIndex: 0});
            const node2 = Node({columnIndex: 0});
            column.addNode(node1);
            column.addNode(node2);
            node1.cover();
            node1.uncover();
            assert.equal(column.down, node1);
            assert.equal(node2.up, node1);
            assert.equal(column.size, 2);
        });
    });
});