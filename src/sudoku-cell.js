import SudokuCoordinates from "./sudoku-coordinates";

const DLX_COLUMN_GROUP_ORDER = {
    CELL_CONSTRAINT: 0,
    ROW_CONSTRAINT: 1,
    COL_CONSTRAINT: 2,
    BLOCK_CONSTRAINT: 3
}

export default function SudokuCell({coords, value}) {
    const cell = Object.create(SudokuCell.prototype);
    cell.coords = coords;
    cell.value = value;
    return cell;
}

SudokuCell.fromMatrixRowNum = (rowNum, puzzleSize = 9) => {
    const row = Math.floor(rowNum / (puzzleSize ** 2));
    const col = Math.floor((rowNum - (row * (puzzleSize ** 2))) / puzzleSize);
    return SudokuCell({
        coords: SudokuCoordinates({
            row: row, 
            column: col, 
            puzzleSize: puzzleSize
        }),
        value: (rowNum % puzzleSize) + 1
    });
}

SudokuCell.prototype = {
    matrixRowNum() {
        return this.coords.row * (this.coords.puzzleSize ** 2) + 
               this.coords.column * this.coords.puzzleSize + 
               this.value - 1
    },

    cellConstraintColNum() {
        return (this.coords.puzzleSize ** 2) * DLX_COLUMN_GROUP_ORDER.CELL_CONSTRAINT +
               this.coords.row * this.coords.puzzleSize + 
               this.coords.column;
    },

    rowConstraintColNum() {
        return (this.coords.puzzleSize ** 2) * DLX_COLUMN_GROUP_ORDER.ROW_CONSTRAINT +
               this.coords.row * this.coords.puzzleSize + 
               this.value - 1;
    },

    colConstraintColNum() {
        return (this.coords.puzzleSize ** 2) * DLX_COLUMN_GROUP_ORDER.COL_CONSTRAINT +
               this.coords.column * this.coords.puzzleSize + 
               this.value - 1;
    },

    blockConstraintColNum() {
        return (this.coords.puzzleSize ** 2) * DLX_COLUMN_GROUP_ORDER.BLOCK_CONSTRAINT +
               this.coords.block * this.coords.puzzleSize + 
               this.value - 1;
    }
}