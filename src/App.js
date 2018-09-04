import React              from 'react';
import { connect }        from 'react-redux';

import Grid from './components/Grid';

import { 
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

import { 
  solve,
  shuffle,
  getMatchingCells,
} from './modules/sudoku/actions';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notification: {},
    }
    this._onPressCell = this._onPressCell.bind(this)
  }

  _onPressCell(row, col) {
    this.props.getMatchingCells(row, col);
  }

  render() {   

    const { sudoku, solve, shuffle } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonShuffle}
          onPress={shuffle}
          underlayColor='#fff'
          >
          <Text style={styles.buttonText}>Shuffle</Text>
        </TouchableOpacity>
        {!sudoku.isEmpty && 
          <TouchableOpacity
            style={styles.buttonSolve}
            onPress={solve}
            underlayColor='#fff'
            disabled={sudoku.isSolved}
          >
            <Text style={styles.buttonText}>{sudoku.isSolved ? 'Solved!' : 'Solve'}</Text>
          </TouchableOpacity>
        }

        <View style={styles.container}>
          <Grid onPressCell={this._onPressCell} sudoku={sudoku} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    sudoku: state.sudoku,
  };
}

export default connect(mapStateToProps, { solve, shuffle, getMatchingCells })(App);

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderTopWidth: 5,
    margin: 0,
    padding: 0,

  },
  buttonShuffle: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#008080',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonSolve:{
    marginRight: 40,
    marginLeft: 40,
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#016936',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 10,
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});
  