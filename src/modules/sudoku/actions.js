import {
  SUDOKU_SOLVE,
  SUDOKU_SHUFFLE,
  SUDOKU_GET_MATCHING_ROW,
  SUDOKU_GET_MATCHING_COL,
  SUDOKU_GET_MATCHING_BLOCK,
} from './constants';

import Sudoku from './Sudoku';
import { generate } from '../../utils/Board';

export function solve(grid) {
  return (dispatch, getState) => {
    
    const stateRows = getState().sudoku.rows;

    const sudoku = new Sudoku(stateRows);
    const solved = sudoku.solve();
    
    console.log('solved', solved);
    
    dispatch({
      type: SUDOKU_SOLVE,
      payload: sudoku._board,
    })
  };
}

export function shuffle() {

  let gridValid = false;

  while (!gridValid) {
    const newGrid = generate(9, 85);
    const sudoku = new Sudoku(newGrid);
    gridValid = sudoku.validate();

    if (gridValid) {
      return (dispatch) => {    
        dispatch({
          type: SUDOKU_SHUFFLE,
          payload: sudoku._board,
        })
      };
    }
  }
}

const getMatchingRow = (rowNumber) => {
  return (dispatch) => {
    dispatch({
      type: SUDOKU_GET_MATCHING_ROW,
      payload: rowNumber,
    })
  };
}

const getMatchingCol = (colNumber) => {
  return (dispatch) => {
    dispatch({
      type: SUDOKU_GET_MATCHING_COL,
      payload: colNumber,
    })
  };
}
const getMatchingBlock = (row, col) => {

  const result = [];
  const _row = row - ( row % 3);
  const _col = col - ( col % 3);
  
  for (let i = _row; i < _row + 3; i++) {
    for(let j = _col; j < _col + 3; j++) {
      result.push({
        row: i,
        col: j,
      })
    }
  }
  return (dispatch) => {
    dispatch({
      type: SUDOKU_GET_MATCHING_BLOCK,
      payload: result,
    })
  };
}

export const getMatchingCells = (row, col) => {
  return (dispatch) => {
    dispatch(getMatchingRow(row));
    dispatch(getMatchingCol(col));
    dispatch(getMatchingBlock(row, col));
  }
}
