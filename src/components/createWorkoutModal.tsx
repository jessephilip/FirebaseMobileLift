import React, { Component } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  } from 'react-native';

// third party components
import FontAwesome, { Icons } from 'react-native-fontawesome';

// styling
import { Styles } from '../styling/styles.styling';

// data models
import { Exercise } from '../constants/classes/exercise.model';
import { Workout } from '../constants/classes/workout.model';

import * as enums from '../constants/enums';
import { ExpandingInput } from './expandingInput.component';
import { MuscleCategory, MuscleGroup } from '../constants/enums';
import { ExerciseDisplay } from './exerciseDisplay.component';

interface Props {
  isVisible: boolean;
  closeModal: () => void;
}

interface State {
  exerciseName: string;
  prefix: string;
  suffix: string;
  resistanceType: string;
  weight: string;
  weightUnit: string;
  repType: string;
  reps: string;
  muscleCategory: MuscleCategory;
  primaryMuscleGroup: MuscleGroup;
  secondaryMuscleGroup: MuscleGroup; // drop down with other
}

export class CreateWorkoutModal extends Component<Props, State> {

  public exerciseNameSetter = (value: string) => this.setState({ exerciseName: value });
  public prefixSetter = (value: string) => this.setState({ prefix: value });
  public suffixSetter = (value: string) => this.setState({ suffix: value });
  public resistanceTypeSetter = (value: string) => this.setState({ resistanceType: value });
  public weightSetter = (value: string) => this.setState({ weight: value });
  public weightUnitSetter = (value: string) => this.setState({ weightUnit: value });
  public repsSetter = (value: string) => this.setState({ reps: value });
  public repTypeSetter = (value: string) => this.setState({ repType: value });

  public exerciseInputs;
  public weightInputs;
  public repInputs;

  constructor (props) {
    super(props);
    this.state = this.initialState;
  }

  componentDidMount () {
    this.exerciseInputs = [
      { icon: 'user', label: 'Exercise Name', value: this.state.exerciseName, stateSetter: this.exerciseNameSetter },
      { icon: 'send', label: 'Prefix', value: this.state.prefix, stateSetter: this.prefixSetter },
      { icon: 'check', label: 'Suffix', value: this.state.suffix, stateSetter: this.suffixSetter }
    ];

    this.weightInputs = [
      { icon: 'user', label: 'Resistance Type', value: this.state.resistanceType, stateSetter: this.resistanceTypeSetter },
      { icon: 'send', label: 'Weight', value: this.state.weight, stateSetter: this.weightSetter },
      { icon: 'check', label: 'Weight Unit', value: this.state.weightUnit, stateSetter: this.weightUnitSetter }
    ];

    this.repInputs = [
      { icon: 'user', label: 'Reps', value: this.state.reps, stateSetter: this.repsSetter },
      { icon: 'send', label: 'Rep Type', value: this.state.repType, stateSetter: this.repTypeSetter }
    ];
  }

  public initialState = {
    exerciseName: '',
    prefix: '',
    suffix: '',
    muscleCategory: MuscleCategory.none,
    primaryMuscleGroup: MuscleGroup.none,
    secondaryMuscleGroup: MuscleGroup.none,
    repType: '',
    reps: '',
    resistanceType: '',
    weight: '',
    weightUnit: ''
  };

  public reset = () => {
    this.setState(this.initialState);
  }

  public renderHeader () {
    return (
      <View
        style={ header.container }>
        <View>
          <TouchableOpacity
            style={[ header.column, { marginRight: 20 } ]}
            onPress={ this.reset }>
            <FontAwesome
              style={ header.graphic }>
              { Icons.trash }
            </FontAwesome>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[ header.column, { marginRight: 20 } ]}
            onPress={ this.props.closeModal }>
            <FontAwesome
              style={ header.graphic }>
              { Icons.close }
            </FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={ header.column }>
            <FontAwesome
              style={ header.graphic }>
              { Icons.check }
            </FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  public renderMain = () => {
    return (
      <View
        style={ main.container }>
        <ScrollView>
          <ExerciseDisplay
            exerciseName={ this.state.exerciseName }
            prefix={ this.state.prefix }
            suffix={ this.state.suffix }

            >
          </ExerciseDisplay>
          <ExpandingInput
            baseHeight={ 75 }
            inputs={ this.exerciseInputs }
            title={{ icon: 'tag', label: 'Exercise' }}/>
          <ExpandingInput
            baseHeight={ 75 }
            inputs={ this.weightInputs }
            title={{ icon: 'tag', label: 'Resistance' }}/>
          <ExpandingInput
            baseHeight={ 75 }
            inputs={ this.repInputs }
            title={{ icon: 'tag', label: 'Reps' }}/>
        </ScrollView>
      </View>
    );
  }

  // took out the footer. put it back in the render function if wanted.
  public renderFooter = () => {
    return (
      <View
        style={ footer.container }>
        <Text>This is the footer</Text>
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
          style={ general.container }>
          { this.renderHeader () }
          { this.renderMain () }
        </View>
      </Modal>
    );
  }
}

const general = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
});

const header = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Styles.colors.primary.dark,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  column: {
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: Styles.textSizes.normal,
    padding: 10
  }
});

const main = StyleSheet.create({
  container: {
    flex: 7,
  }
});

const footer = StyleSheet.create({
  container: {
    flex: 1
  }
});
