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

    describe('traverseRight', () => {
        it('iterates through the node\'s right-hand neighbors, applying the given function to each one', () => {
            const node1 = Node({columnIndex: 1});
            const node2 = Node({columnIndex: 2});
            const node3 = Node({columnIndex: 3});
            node1.right = node2;
            node2.right = node3;
            node3.right = node1;
            const columnIndexes = [];
            const testFunc = (node) => (columnIndexes.push(node.columnIndex));
            node1.traverseRight(testFunc);
            assert.deepStrictEqual(columnIndexes, [2, 3]);
        });
    });

    describe('traverseLeft', () => {
        it('iterates through the node\'s left-hand neighbors, applying the given function to each one', () => {
            const node1 = Node({columnIndex: 1});
            const node2 = Node({columnIndex: 2});
            const node3 = Node({columnIndex: 3});
            node1.left = node3;
            node2.left = node1;
            node3.left = node2;
            const columnIndexes = [];
            const testFunc = (node) => (columnIndexes.push(node.columnIndex));
            node1.traverseLeft(testFunc);
            assert.deepStrictEqual(columnIndexes, [3, 2]);
        });
    });

    describe('traverseUp', () => {
        it('iterates through the node\'s upward neighbors, applying the given function to each one', () => {
            const node1 = Node({columnIndex: 1});
            const node2 = Node({columnIndex: 2});
            const node3 = Node({columnIndex: 3});
            node1.up = node2;
            node2.up = node3;
            node3.up = node1;
            const columnIndexes = [];
            const testFunc = (node) => (columnIndexes.push(node.columnIndex));
            node1.traverseUp(testFunc);
            assert.deepStrictEqual(columnIndexes, [2, 3]);
        });
    });

    describe('traverseDown', () => {
        it('iterates through the node\'s downward neighbors, applying the given function to each one', () => {
            const node1 = Node({columnIndex: 1});
            const node2 = Node({columnIndex: 2});
            const node3 = Node({columnIndex: 3});
            node1.down = node3;
            node2.down = node1;
            node3.down = node2;
            const columnIndexes = [];
            const testFunc = (node) => (columnIndexes.push(node.columnIndex));
            node1.traverseDown(testFunc);
            assert.deepStrictEqual(columnIndexes, [3, 2]);
        });
    });
});