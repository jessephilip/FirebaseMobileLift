import React, { Component } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Styles } from '../styling/styles.styling';

import { monthConverter, weekdayConverter } from '../constants/dateConverter';
import { Workout } from '../constants/classes/workout.model';
import { WORKOUT } from '../constants/mock.data';
import { ExerciseModal } from '../components/exerciseModal.component';
import { CreateWorkoutModal } from '../components/createWorkoutModal';
import { SearchPicker } from '../components/searchPicker.component';

interface Props {
  navigation: any;
}
interface State {
  showExerciseModal: boolean;
  showCreateWorkoutModal: boolean;
}

export class TodayScreen extends Component<Props, State> {

  public workout: Workout;

  constructor (props) {
    super(props);
    this.workout = WORKOUT;

    this.state = {
      showExerciseModal: false,
      showCreateWorkoutModal: false,
    };
  }

  private getDate = (): string => {
    const dateObject = new Date()
    , month = dateObject.getMonth()
    , day = dateObject.getDate()
    , year = dateObject.getFullYear()
    ;

    return `${ monthConverter(month) } ${ day }, ${ year }`;
  }

  public exerciseDisplay = () => {
    if (!this.workout) {
      return (
        <TouchableOpacity
          onPress={ () => this.setState({ showExerciseModal: true }) }>
          <View
            style={ styling.exerciseView }>
            <Text
              style={ styling.exerciseTitle }>
              { this.workout.name || 'No exercise planned' }
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={ () => this.setState({ showCreateWorkoutModal: true }) }>
          <View
            style={ styling.exerciseSubView }>
            <Text
              style={ styling.exerciseTitle }>
              No workout scheduled for today
            </Text>
            <Text
              style={ styling.exerciseSub }>
              Create workout
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  public render () {
    return (
      <View
        style={ styling.container }>
        <Text
          style={ styling.date }>
          { this.getDate() }
        </Text>
        { this.exerciseDisplay() }
        <SearchPicker></SearchPicker>
        <ExerciseModal
          closeModal={ () => this.setState({ 'showExerciseModal': false }) }
          isVisible={ this.state.showExerciseModal }
          workout={ WORKOUT } />
        <CreateWorkoutModal
          closeModal={ () => this.setState({ 'showCreateWorkoutModal': false }) }
          isVisible={ this.state.showCreateWorkoutModal } />
      </View>
    );
  }
}

const styling = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  date: {
    backgroundColor: Styles.colors.secondary.main,
    color: 'white',
    fontSize: Styles.textSizes.normal,
    padding: 10,
    textAlign: 'center',
    textShadowColor: Styles.shadows.textShadow.textShadowColor,
    textShadowOffset: Styles.shadows.textShadow.textShadowOffset,
    textShadowRadius: Styles.shadows.textShadow.textShadowRadius
  },
  exerciseView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: Styles.colors.secondary.dark,
    height: 150,
    justifyContent: 'center'
  },
  exerciseSubView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: Styles.colors.secondary.dark,
    height: 150,
    justifyContent: 'space-around'
  },
  exerciseTitle: {
    fontSize: Styles.textSizes.normal,
    textAlign: 'center'
  },
  exerciseSub: {
    fontSize: Styles.textSizes.small,
    textAlign: 'center'
  }
});