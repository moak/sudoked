import { combineReducers } from 'redux';

import sudoku from './sudoku/reducers';

const rootReducer = combineReducers({
    sudoku,
});

export default rootReducer;
