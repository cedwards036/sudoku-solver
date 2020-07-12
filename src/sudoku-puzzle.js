export default function SudokuPuzzle(puzzleGrid) {
    const puzzle = Object.create(SudokuPuzzle.prototype);
    puzzleGrid.forEach((row, index) => puzzle[index] = row);
    puzzle.size = puzzleGrid.length;
    puzzle.blockSize = Math.sqrt(puzzle.size);
    return puzzle;
}

SudokuPuzzle.createEmpty = (size = 9) => {
    const emptyPuzzle = new Array(size).fill().map(() => new Array(size).fill(0));
    return SudokuPuzzle(emptyPuzzle);
}

SudokuPuzzle.prototype = {
    getRow(rowIndex) {
        return this[rowIndex];
    },

    getRows() {
        return range(this.size).map(i => this[i]);
    },

    getCol(colIndex) {
        return range(this.size).map(row => this[row][colIndex]);
    },

    getBlock(blockIndex) {
        const block = [];
        const startingRow =  Math.floor(blockIndex / this.blockSize) * this.blockSize;
        const startingCol = (blockIndex % this.blockSize) * this.blockSize; 
        for (let row = startingRow; row < startingRow + this.blockSize; row++) {
            for (let col = startingCol; col < startingCol + this.blockSize; col++) {
                block.push(this[row][col]);
            }
        }
        return block;
    }
}

function range(n) {
    return [...Array(n).keys()];
}