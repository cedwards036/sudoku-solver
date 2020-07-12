export default function SudokuCoordinates({row, column, gameDimension = 9}) {
    const coords = Object.create(SudokuCoordinates.prototype);
    coords.row = row;
    coords.column = column;
    coords.block = calculateBlockFromRowAndCol(row, column, gameDimension);
    coords.gameDimension = gameDimension;
    return coords;
}

function calculateBlockFromRowAndCol(row, column, gameDimension) {
    const blockWidth = Math.sqrt(gameDimension);
    return Math.floor(row / blockWidth) * blockWidth + 
    Math.floor(column / blockWidth);
}

SudokuCoordinates.prototype = {
    getValueIn(puzzle) {
        return puzzle[this.row][this.column];
    }
};