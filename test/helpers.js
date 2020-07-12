export function blankSudoku(gameDimension) {
    return new Array(gameDimension).fill().map(() => {
        return new Array(gameDimension).fill(0)
    });
}