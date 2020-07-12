const DLX_COLUMN_GROUP_ORDER = {
    CELL_CONSTRAINT: 0,
    ROW_CONSTRAINT: 1,
    COL_CONSTRAINT: 2,
    BLOCK_CONSTRAINT: 3
}

export default function SudokuCell({row, column, value, gameDimension = 9}) {
    const cell = Object.create(SudokuCell.prototype);
    cell.row = row;
    cell.column = column;
    cell.value = value;
    cell.block = calculateBlockFromRowAndCol(row, column, gameDimension);
    cell.gameDimension = gameDimension;
    return cell;
}

SudokuCell.fromMatrixRowNum = (rowNum, gameDimension = 9) => {
    const row = Math.floor(rowNum / (gameDimension ** 2));
    return SudokuCell({
        row: row, 
        column: Math.floor((rowNum - (row * (gameDimension ** 2))) / gameDimension), 
        value: (rowNum % gameDimension) + 1
    });
}

SudokuCell.prototype = {
    matrixRowNum() {
        return this.row * (this.gameDimension ** 2) + 
               this.column * this.gameDimension + 
               this.value - 1
    },

    cellConstraintColNum() {
        return (this.gameDimension ** 2) * DLX_COLUMN_GROUP_ORDER.CELL_CONSTRAINT +
               this.row * this.gameDimension + 
               this.column;
    },

    rowConstraintColNum() {
        return (this.gameDimension ** 2) * DLX_COLUMN_GROUP_ORDER.ROW_CONSTRAINT +
               this.row * this.gameDimension + 
               this.value - 1;
    },

    colConstraintColNum() {
        return (this.gameDimension ** 2) * DLX_COLUMN_GROUP_ORDER.COL_CONSTRAINT +
               this.column * this.gameDimension + 
               this.value - 1;
    },

    blockConstraintColNum() {
        return (this.gameDimension ** 2) * DLX_COLUMN_GROUP_ORDER.BLOCK_CONSTRAINT +
               this.block * this.gameDimension + 
               this.value - 1;
    }
}

function calculateBlockFromRowAndCol(row, column, gameDimension) {
    const blockWidth = Math.sqrt(gameDimension);
    return Math.floor(row / blockWidth) * blockWidth + 
    Math.floor(column / blockWidth);
}