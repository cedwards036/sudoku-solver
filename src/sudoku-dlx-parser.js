import SudokuCoordinates from './sudoku-coordinates';
import SudokuCell from './sudoku-cell';
import SudokuPuzzle from './sudoku-puzzle';
import Node from './dlx-node';
import {range} from './util';

export function createDLXRowsFromPuzzle(puzzle) {
    const rows = [];
    puzzle.getRows().forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const coords = SudokuCoordinates({
                row: rowIndex, 
                column: colIndex, 
                puzzleSize: puzzle.size
            });
            const candidates = getViableCandidatesForCell(coords, puzzle);
            candidates.forEach(candidate => {
                const sudokuCell = SudokuCell({coords: coords, value: candidate});
                rows.push(createNodeRowFromCell(sudokuCell));
            });
        });
    });
    return rows;
}

export function getViableCandidatesForCell(coords, puzzle) {
    if (coords.getValueIn(puzzle) !== 0) {
        return [coords.getValueIn(puzzle)];
    } else {  
        const candidates = range(puzzle.size).map(x => x + 1);
        eliminateFromCandidates(puzzle.getRow(coords.row), candidates);
        eliminateFromCandidates(puzzle.getCol(coords.column), candidates);
        eliminateFromCandidates(puzzle.getBlock(coords.block), candidates);
        return candidates.filter(x => x !== 0);
    }
}

function eliminateFromCandidates(neighborGroup, candidates) {
    neighborGroup.filter(cellValue => cellValue !== 0)
                 .forEach(cellValue => candidates[cellValue - 1] = 0);
}

export function createNodeRowFromCell(sudokuCell) {
    const nodes = [
        Node({columnIndex: sudokuCell.cellConstraintColNum(), sudokuCell: sudokuCell}),
        Node({columnIndex: sudokuCell.rowConstraintColNum(), sudokuCell: sudokuCell}),
        Node({columnIndex: sudokuCell.colConstraintColNum(), sudokuCell: sudokuCell}),
        Node({columnIndex: sudokuCell.blockConstraintColNum(), sudokuCell: sudokuCell})
    ]
    return linkNodes(nodes);
}

function linkNodes(nodes) {
    let curNode = nodes[0];
    for (let i = 0; i < nodes.length; i++) {
        curNode.right = nodes[(i + 1) % nodes.length];
        curNode.right.left = curNode;
        curNode = curNode.right;
    }
    return nodes;
}

export function convertDLXResultsToSudoku(dlxResults) {
    return dlxResults.map(result => {
        const puzzle = SudokuPuzzle.createEmpty(result[0].coords.puzzleSize);
        result.forEach(cell => puzzle[cell.coords.row][cell.coords.column] = cell.value);
        return puzzle;
    });
}

