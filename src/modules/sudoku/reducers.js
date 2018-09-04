import update from 'react-addons-update';
import { flatten } from '../../utils/Array';
import { generate, generateEmpty } from '../../utils/Board';

import {
  SUDOKU_SOLVE,
  SUDOKU_SHUFFLE,
  SUDOKU_GET_MATCHING_ROW,
  SUDOKU_GET_MATCHING_COL,
  SUDOKU_GET_MATCHING_BLOCK,
} from './constants';

const initialState = {
  rows: generateEmpty(9),
  isEmpty: true,
  isSolved: false,
  matchingRow: null,
  matchingCol: null,
  matchingBlock: null,
}

export default function sudoku (state = initialState, action) {

  switch (action.type) {

    case SUDOKU_SOLVE:
      return update(state, {
        rows: {
          $set: action.payload,
        },
        isSolved: {
          $set: true,
        }
      });

    case SUDOKU_SHUFFLE:   
      return update(state, {
        rows: {
          $set: action.payload
        },
        matchingCol: {
          $set: null
        },
        matchingRow: {
          $set: null
        },
        matchingBlock: {
          $set: null
        },
        isSolved: {
          $set: false,
        },
        isEmpty: {
          $set: false,
        }
      });

    case SUDOKU_GET_MATCHING_ROW:   
      return update(state, {
        matchingRow: {
          $set: action.payload
        }
      });

    case SUDOKU_GET_MATCHING_COL:   
      return update(state, {
        matchingCol: {
          $set: action.payload
        }
      });
      
    case SUDOKU_GET_MATCHING_BLOCK:   
      return update(state, {
        matchingBlock: {
          $set: action.payload
        }
      });
  
    default:
      return state;
  }
}
