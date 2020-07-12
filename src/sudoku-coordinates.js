export default function SudokuCoordinates({row, column, puzzleSize = 9}) {
    const coords = Object.create(SudokuCoordinates.prototype);
    coords.row = row;
    coords.column = column;
    coords.block = calculateBlockFromRowAndCol(row, column, puzzleSize);
    coords.puzzleSize = puzzleSize;
    return coords;
}

function calculateBlockFromRowAndCol(row, column, puzzleSize) {
    const blockSize = Math.sqrt(puzzleSize);
    return Math.floor(row / blockSize) * blockSize + 
    Math.floor(column / blockSize);
}

SudokuCoordinates.prototype = {
    getValueIn(puzzle) {
        return puzzle[this.row][this.column];
    }
};