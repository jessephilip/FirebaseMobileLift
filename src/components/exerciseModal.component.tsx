import React, { Component } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// third party components
import FontAwesome, { Icons } from 'react-native-fontawesome';

// custom components
import { ExerciseScreenBarButtons } from '../components/exerciseScreenBarButtons.component';

// styling
import { Styles } from '../styling/styles.styling';

// data models
import { Exercise } from '../constants/classes/exercise.model';
import { Workout } from '../constants/classes/workout.model';

import * as enums from '../constants/enums';

interface Props {
  isVisible: boolean;
  workout: Workout;
  closeModal: () => void;
}
interface State {
  exerciseIndex: number;
}

enum CategoryIcons {
  abs = '../../assets/icons-96/prelum.png'
}

export class ExerciseModal extends Component<Props, State> {

  public workout: Workout = this.props.workout;
  public exercises: Exercise[] = this.props.workout.exercises;

  constructor (props) {
    super(props);
    this.state = {
      exerciseIndex: 0
    };
  }

  public incExercise = () => {
    const numberOfExercises = this.workout.exercises.length;
    if (this.state.exerciseIndex >= numberOfExercises) {
      return false;
    }
    const num = this.state.exerciseIndex + 1;
    this.setState({ exerciseIndex: num });
  }

  public decExercise = () => {
    if (this.state.exerciseIndex <= 0) {
      return false;
    }
    const num = this.state.exerciseIndex - 1;
    this.setState({ exerciseIndex: num });
  }

  public setCategoryIcon () {
    let icon;
    switch (this.props.workout.exercises[this.state.exerciseIndex].muscleCategory) {
      case 'arms':
        return (
          <Image source={ require('../../assets/icons-96/muscle.png') }/>
        );
      case 'back':
        return (
          <Image source={ require('../../assets/icons-96/back.png') }/>
        );
      case 'chest':
        return (
          <Image source={ require('../../assets/icons-96/chest.png') }/>
        );
      case 'core':
        return (
          <Image source={ require('../../assets/icons-96/prelum.png') }/>
        );
      case 'glutes':
        return (
          <Image source={ require('../../assets/icons-96/bottom.png') }/>
        );
      case 'legs':
        return (
          <Image source={ require('../../assets/icons-96/leg.png') }/>
        );
      case 'shoulders':
        return (
          <Image source={ require('../../assets/icons-96/shoulders.png') }/>
        );
      default:
        return undefined;
    }
  }

  public renderHeader () {
    return (
      <View
        style={ header.view }>
        <TouchableOpacity
          style={ header.column }
          onPress={ this.props.closeModal }>
          <FontAwesome
            style={ header.graphic }>
            { Icons.close }
          </FontAwesome>
        </TouchableOpacity>
        <Text
          style={ header.text }>
          { this.state.exerciseIndex + 1 }/{ this.props.workout.exercises.length }
        </Text>
        <TouchableOpacity
          style={ header.column }>
          <FontAwesome
            style={ header.graphic }>
            { Icons.bars }
          </FontAwesome>
        </TouchableOpacity>
      </View>
    );
  }

  public renderMain () {

    /*  MAIN-TOP  */
    const renderMainTop = () => {
      return (
        <View
          style={ main.top }>
          <View
            style={ main.nameView }>
            <Text
              style={ main.nameText }>
              { this.workout.exercises[this.state.exerciseIndex].name || 'name' }
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
            <Text
              style={{
                color: Styles.colors.primary.main,
                fontSize: Styles.textSizes.normal
              }}>
              { this.workout.exercises[this.state.exerciseIndex].prefix || '' }
            </Text>
            <Text
              style={{
                color: Styles.colors.primary.main,
                fontSize: Styles.textSizes.normal
              }}>
              { this.workout.exercises[this.state.exerciseIndex].suffix || '' }
            </Text>
          </View>
        </View>
      );
    };

    /*  MAIN-MIDDLE  */
    const renderMainMiddle = () => {
      const renderMuscleGroup = muscleGroup => {
        if (this.exercises[this.state.exerciseIndex][muscleGroup]) {
          return (
            <View
              style={ main.muscleGroup }>
              <Text
                style={ main.metaText }>
                Primary
              </Text>
              <Text
                style={ main.muscleGroupText }>
                { this.exercises[this.state.exerciseIndex][muscleGroup] }
              </Text>
            </View>
          );
        }
      };

      return (
        <View
          style={ main.middle }>
          <View
            style={ main.weightAndRepRow }>
            <View
              style={ main.weightView }>
              <Text
                style={{
                  color: Styles.colors.primary.main,
                  fontSize: Styles.textSizes.large
                }}>
                { this.exercises[this.state.exerciseIndex].weight }
              </Text>
              <Text
                style={ main.metaText }>
                { this.exercises[this.state.exerciseIndex].weightUnit }
              </Text>
            </View>
            <View
              style={ main.weightView }>
              <Text
                style={{
                  color: Styles.colors.primary.main,
                  fontSize: Styles.textSizes.large
                }}>
                { this.exercises[this.state.exerciseIndex].reps || '' }
              </Text>
              <Text
                style={ main.metaText }>
                { this.exercises[this.state.exerciseIndex].repType || ''}
              </Text>
            </View>
          </View>
          <View
            style={ main.muscleGroupsRow }>
            { renderMuscleGroup('primaryMuscleGroup') }
            { renderMuscleGroup('secondaryMuscleGroup') }
          </View>
        </View>
      );
    };

    /*  MAIN-BOTTOM  */
    const renderMainBottom = () => {
      return (
        <View
          style={ main.bottom }>
        </View>
      );
    };

    return (
      <View
        style={ main.view }>
        <View
          style={ main.backgroundImage }>
          { this.setCategoryIcon() }
        </View>
        { renderMainTop() }
        { renderMainMiddle() }
        { renderMainBottom() }
      </View>
    );
  }

  public renderFooter () {
    return (
      <View
        style={ footer.view }>
        <ExerciseScreenBarButtons
          exercise={ this.workout.exercises[this.state.exerciseIndex] }
          decExercise={ this.decExercise }
          incExercise={ this.incExercise }
          nextExercise={ this.workout.exercises[this.state.exerciseIndex + 1] }
          prevExercise={ this.workout.exercises[this.state.exerciseIndex - 1] }
          showBack={ this.state.exerciseIndex > 0 }
          showNext={ this.state.exerciseIndex < this.workout.exercises.length - 1 } />
      </View>
    );
  }

  public render () {
    return (
      <Modal
        animationType='slide'
        transparent={ false }
        visible={ this.props.isVisible }>
        <View
          style={ styling.container }>
          { this.renderHeader() }
          { this.renderMain() }
          { this.renderFooter() }
        </View>
      </Modal>
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
    backgroundColor: Styles.colors.primary.dark,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  column: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    flex: 1,
    fontSize: Styles.textSizes.normal,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  graphic: {
    color: 'white',
    fontSize: Styles.textSizes.normal
  }
});

const main = StyleSheet.create({
  backgroundImage: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    opacity: .1,
    position: 'absolute',
    width: '100%',
  },
  bottom: {
    flex: 1
  },
  metaText: {
    color: Styles.colors.primary.light,
    fontSize: Styles.textSizes.extraSmall,
    textAlign: 'center'
  },
  middle: {
    flex: 1
  },
  muscleGroupsRow: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  muscleGroup: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column'
  },
  muscleGroupText: {
    color: Styles.colors.primary.main,
    textAlign: 'center'
  },
  nameView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingTop: 20
  },
  nameText: {
    color: Styles.colors.secondary.main,
    fontSize: Styles.textSizes.large
  },
  view: {
    backgroundColor: 'white',
    flex: 5
  },
  text: {
    color: 'black'
  },
  top: {
    flex: 1
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  weightAndRepRow: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10
  },
  weightView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 4,
    justifyContent: 'center',
  }
});

const footer = StyleSheet.create({
  view: {
    flex: 2,
    flexDirection: 'row'
  }
});
