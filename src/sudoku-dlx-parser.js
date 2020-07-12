export function getViableCandidatesForCell(coords, puzzle) {
    if (coords.getValueIn(puzzle) !== 0) {
        const candidates = new Array(puzzle.size).fill(false);
        candidates[coords.getValueIn(puzzle) - 1] = true;
        return candidates;
    } else {  
        const candidates = new Array(puzzle.size).fill(true);
        eliminateFromCandidates(puzzle.getRow(coords.row), candidates);
        eliminateFromCandidates(puzzle.getCol(coords.column), candidates);
        eliminateFromCandidates(puzzle.getBlock(coords.block), candidates);
        return candidates;
    }
}

function eliminateFromCandidates(neighborGroup, candidates) {
    neighborGroup.filter(cellValue => cellValue !== 0)
                 .forEach(cellValue => candidates[cellValue - 1] = false);
}