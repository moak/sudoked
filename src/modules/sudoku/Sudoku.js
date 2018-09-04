// import { generate } from '../../utils/Board';

export default class Sudoku {
  constructor(board) {
    this._board = board;
  }
  
  checkEmptyOnRow(row, col, number, allowCurrent = false) {
    for (let j = 0; j < this._board[row].length; j++) {
      // false if number found
      const condition = allowCurrent ? this._board[row][j] === number && col !== j : this._board[row][j] === number;
      if (condition) {
        return false;
      }
    }
    // true if empty on row
    return true;
  }

  checkEmptyOnColumn(row, col, number, allowCurrent = false) {
    for (let i = 0; i < this._board.length; i++) {
      const condition = allowCurrent ? this._board[i][col] === number && row !== i : this._board[i][col] === number;
      // false if number found      
      if (condition) {
        return false;
      }
    }
    // true if empty on col
    return true;
  }

  checkEmptyOnBloc(row, col, number, allowCurrent = false) {
    
    const _row = row - ( row % 3);
    const _col = col - ( col % 3);
    
    for (let i = _row; i < _row + 3; i++) {
      for(let j = _col; j < _col + 3; j++) {
        const condition = allowCurrent ? this._board[i][j] === number && col !== j && row !== i : this._board[i][j] === number && col !== j;
        // false if number found
        if (condition) {        
          return false;
        }
      }
    }
    // true if empty on bloc
    return true;
  }

  solve(position = 0) {
    
    // end condition
    if (position == 9 * 9)
        return true;

    let i = Math.floor(position / 9);
    let j = position % 9;
    
    // skip if value already filled
    if (this._board[i][j] != 0)
        return this.solve(position+1);

    for (let number = 1; number <= 9; number++) {      
      if (this.checkEmptyOnRow(i, j, number) && this.checkEmptyOnColumn(i, j, number) && this.checkEmptyOnBloc(i, j, number)) {
        this._board[i][j] = number;
        
        if (this.solve(position+1) )
          return true;
      }
    }
    this._board[i][j] = 0;
    return false;
  }

  validate() {

    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board.length; j++) {
        // skip if 0
        console.log('this._board[i][j]', this._board[i][j]);
        
        if (this._board[i][j] !== 0) {
          if (!this.checkEmptyOnRow(i, j, this._board[i][j], true) || 
              !this.checkEmptyOnColumn(i, j, this._board[i][j], true) || 
              !this.checkEmptyOnBloc(i, j, this._board[i][j], true)) {
            return false;
          } 
        }
      }
    }
    return true;
  }

  getMatchingBlock(row, col) {
    let result = []
    const _row = row - ( row % 3);
    const _col = col - ( col % 3);

    for (let i = _row; i < _row + 3; i++) {
      for(let j = _col; j < _col + 3; j++) {
        if (row === i || col === j) {
          result.push({
            row: i,
            col: j,
          })
        }
      }
    }
    return result;
  }
}

// // const newGrid = generate(9, 90);
// const newGrid = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 7],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 8],
// ];
// const sudoku = new Sudoku(newGrid);

// // const etst = sudoku.getMatchingBlock(5, 5)
// // console.log('checkEmptyOnColumn', sudoku.checkEmptyOnColumn(8, 1));
// console.log('validate', sudoku.validate());
