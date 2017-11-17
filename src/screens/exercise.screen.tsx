import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Styles } from '../styling/styles.styling';
import { Exercise } from '../constants/classes/exercise.model';
import { WORKOUT } from '../constants/mock.data';
import { ExerciseScreenBarButtons } from '../components/exerciseScreenBarButtons.component';
import { Workout } from '../constants/classes/workout.model';

interface Props {
  workout: Workout;
}
interface State {}

export class ExerciseScreen extends Component<Props, State> {

  public exercise: Exercise;
  public workoutIndex: number;

  constructor (props) {
    super(props);
    this.workoutIndex = 0;
    this.exercise = this.props.workout.exercises[this.workoutIndex];
  }

  public render () {
    return (
      <View
        style={ styling.container }>
        <View
          style={ header.view }>
          <Text
            style={ header.text }>
            { this.exercise.name || 'error' }
          </Text>
        </View>
        <View
          style={ main.view }>
          <Text>This is the Exercise Screen</Text>
        </View>
        <View
          style={ footer.view }>
          <ExerciseScreenBarButtons
            exerciseNote={ this.exercise.exerciseNote } />
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
    color: 'white',
    fontSize: Styles.textSizes.normal,
    fontWeight: 'bold',
    textShadowColor: Styles.shadows.textShadow.textShadowColor,
    textShadowOffset: Styles.shadows.textShadow.textShadowOffset,
    textShadowRadius: Styles.shadows.textShadow.textShadowRadius
  }
});

const main = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    flex: 5
  },
  text: {
    color: 'black'
  }
});

const footer = StyleSheet.create({
  view: {
    flex: 2,
    flexDirection: 'row'
  }
});
