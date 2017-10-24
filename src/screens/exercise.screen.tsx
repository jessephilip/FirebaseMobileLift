import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Styles } from '../styling/styles.styling';

export class ExerciseScreen extends Component {

  constructor (props) {
    super(props);
  }

  public render () {
    return (
      <View
        style={ styling.container }>
        <View
          style={ header.view }>
          <Text
            style={ header.text }>
            Exercise Name
          </Text>
        </View>
        <View
          style={ main.view }>
          <Text>This is the Exercise Screen</Text>
        </View>
        <View
          style={ footer.view }>
          <TouchableOpacity
            style={ footer.fail }>
            <Text
              style={ footer.text }>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ footer.success }>
            <Text
              style={ footer.text }>Right</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styling = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
});

const header = StyleSheet.create({
  view: {
    alignItems: 'center',
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  }
});

const main = StyleSheet.create({
  view: {
    backgroundColor: 'gray',
    flex: 6
  },
  text: {
    color: 'white'
  }
});

const footer = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    color: 'white'
  },
  fail: {
    alignItems: 'center',
    backgroundColor: Styles.colors.fail,
    flex: 1,
    justifyContent: 'center'
  },
  success: {
    alignItems: 'center',
    backgroundColor: Styles.colors.success,
    flex: 1,
    justifyContent: 'center'
  }
});