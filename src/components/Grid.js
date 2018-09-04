import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import Cell from './Cell';

class Grid extends React.Component {

  renderGrid(grid) {
    return grid.map((rowArray, indexRow) => {
         
      const rowSeperator = ((indexRow == 2 || indexRow == 5)) ? true : false;

      return (
        <View key={indexRow} style={[styles.row]}>
          {rowArray.map((value, indexCol) => {  
            const colSeperator = ((indexCol == 2 || indexCol == 5)) ? true : false;          
            const linesHighlighed = indexRow === this.props.sudoku.matchingRow || indexCol === this.props.sudoku.matchingCol;
            let blockHighlighed = false;
            if (this.props.sudoku.matchingBlock) {
              this.props.sudoku.matchingBlock.forEach((cell) => {                
                if (cell.row === indexRow && cell.col === indexCol) {
                  blockHighlighed = true;
                } 
              });
            }

            return (
              <TouchableHighlight 
                key={`${indexRow}_${indexCol}`}
                onPress={() => { this.props.onPressCell(indexRow, indexCol )}}
              >
                <Cell
                  value={value}
                  style={[styles.box, rowSeperator && styles.rowSeperator, colSeperator && styles.colSeperator, linesHighlighed && styles.linesHighlighed, blockHighlighed && styles.blockHighlighed]}
                />
              </TouchableHighlight>
            )
          })}
        </View>
      )
    })
  }
  render() {        
    return (
      <View>
        {this.renderGrid(this.props.sudoku.rows)}
      </View>
    )
  }
}

export default Grid;

const styles = {
  rowSeperator: {
    marginBottom: 5
  },
  colSeperator: {
    marginRight: 3
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    width: 25,
    height: 25,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    margin : 1,
    borderRadius: 5
  },
  linesHighlighed: {
    backgroundColor: 'red',
  },
  blockHighlighed: {
    backgroundColor: 'gray',
  }
};
