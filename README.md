# sudoku-solver
An NPM package that efficiently solves classic sudoku puzzles using Knuth's DLX algorithm
# Install
```
$ npm install @cedwards036/sudoku-solver
```
# Usage
``` js
const solveClassicSudoku = require('@cedwards036/sudoku-solver').solveClassicSudoku;

const puzzle = [
    [5, 0, 0, 2, 0, 0, 0, 4, 0],
    [0, 0, 0, 6, 0, 3, 0, 0, 0],
    [0, 3, 0, 0, 0, 9, 0, 0, 7],
    [0, 0, 3, 0, 0, 7, 0, 0, 0],
    [0, 0, 7, 0, 0, 8, 0, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 8, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 4, 0, 0, 6, 0, 0],
    [0, 0, 0, 1, 0, 0, 5, 0, 0],
]

solveClassicSudoku(puzzle);

/*
=>  [
        [
            [5, 9, 8, 2, 7, 1, 3, 4, 6],
            [7, 4, 2, 6, 5, 3, 8, 9, 1],
            [1, 3, 6, 8, 4, 9, 2, 5, 7],
            [8, 1, 3, 5, 2, 7, 9, 6, 4],
            [4, 2, 7, 9, 6, 8, 1, 3, 5],
            [6, 5, 9, 3, 1, 4, 7, 2, 8],
            [2, 8, 5, 7, 9, 6, 4, 1, 3],
            [9, 7, 1, 4, 3, 5, 6, 8, 2],
            [3, 6, 4, 1, 8, 2, 5, 7, 9]
        ]
    ]
 */
```
**NOTE:** `puzzle` must be a 2D, *n* x *n* array of integers from 0 to *n*. Only perfect square Sudoku sizes are accepted: 4x4, 9x9 (traditional), 16x16, etc. "0" represents an empty square in the puzzle. 

**NOTE:** `solveClassicSudoku` will return at most **2** solutions. If a puzzle has no solutions, it returns an empty array. If a puzzle has one unique solution, it returns an array with a single element (the solution), as in the example above. If the puzzle has multiple solutions, only the first 2 solutions will be returned. 


