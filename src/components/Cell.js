import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Cell extends React.Component {
  render() {        
    return (
      <View style={this.props.style}>
        <Text>{this.props.value === 0 ? null : this.props.value}</Text>
      </View>
    )
  }
};

export default Cell;