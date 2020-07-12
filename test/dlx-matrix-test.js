import assert from 'assert';
import DLXMatrix from '../src/dlx-matrix';

describe('DLXMatrix', () => {
    it('creates a circular header row with the specified number of column headers', () => {
        const matrix = DLXMatrix(3);
        let column = matrix.head;
        for (let i = 0; i < 3; i++) {
            assert.equal(column.index, i);
            column = column.right;
        }
        assert.equal(column.index, 0);
    });
});