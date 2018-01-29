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

import { ToastComponent } from '../components/toast.component';

// third party components
import FontAwesome, { Icons } from 'react-native-fontawesome';

// styling
import { Styles } from '../styling/styles.styling';

// data models
import { Exercise } from '../constants/classes/exercise.model';
import { Workout } from '../constants/classes/workout.model';

import * as enums from '../constants/enums';
import { ExpandingInput } from './expandingInput.component';
import { ExerciseDisplay } from './exerciseDisplay.component';

// mock data
import { MUSCLECATEGORY, MUSCLEGROUP, RESISTANCETYPE } from '../constants/mock.data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
  muscleCategory: string;
  primaryMuscleGroup: string;
  secondaryMuscleGroup: string;

  // for toast notification
  resetExercises: boolean;
  resetWeights: boolean;
  resetReps: boolean;
  resetGroups: boolean;
  toastIsMounted: boolean;
  toastMessage: string;
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
  public categorySetter = (value: string) => this.setState({ muscleCategory: value });
  public primarySetter = (value: string) => this.setState({ primaryMuscleGroup: value });
  public secondarySetter = (value: string) => this.setState({ secondaryMuscleGroup: value });

  public exerciseInputs;
  public weightInputs;
  public repInputs;
  public groupInputs;

  public toastSubject = new BehaviorSubject<boolean>(false);
  public toastListener;

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

    this.groupInputs = [
      { choices: MUSCLECATEGORY, icon: 'user', label: 'Exercise Category', value: this.state.muscleCategory, stateSetter: this.categorySetter },
      { choices: MUSCLEGROUP, icon: 'send', label: 'Primary Muscle Group', value: this.state.primaryMuscleGroup, stateSetter: this.primarySetter },
      { choices: MUSCLEGROUP, icon: 'check', label: 'Secondary Muscle Group', value: this.state.secondaryMuscleGroup, stateSetter: this.secondarySetter }
    ];

   this.toastListener = this.toastSubject.subscribe(value => this.setState({ toastIsMounted: value }));
  }

  public initialState = {
    exerciseName: '',
    prefix: '',
    suffix: '',
    muscleCategory: MUSCLECATEGORY[0],
    primaryMuscleGroup: MUSCLEGROUP[0],
    secondaryMuscleGroup: MUSCLEGROUP[0],
    repType: '',
    reps: '',
    resistanceType: '',
    weight: '',
    weightUnit: '',
    resetExercises: false,
    resetWeights: false,
    resetReps: false,
    resetGroups: false,
    toastIsMounted: false,
    toastMessage: ''
  };

  public reset = () => {
    for (let key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        this.setState({ [key]: '' });
      }
    }

    // TODO: do other things to reset exerciseDisplay and expanding inputs
    this.setState({ resetExercises: true });
    this.setState({ resetWeights: true });
    this.setState({ resetReps: true });
    this.setState({ resetGroups: true });

    // this.setState({ resetExercises: false });
    // this.setState({ resetWeights: false });
    // this.setState({ resetReps: false });
    // this.setState({ resetGroups: false });
  }

  public resetValue = arr => {
    arr.forEach((key, value, object) => {
      console.log(key);
      console.log(value);
      // element.reset = true;
    });
  }

  public submit = () => {
    // send info to toast
    if (!this.state.exerciseName) {
      this.setState({ toastMessage: 'Exercise Name is required.' });
    } else {
      this.setState({ toastMessage: this.state.exerciseName });
    }

    this.setState({ toastIsMounted: true });
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
        <View
          style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[ header.column, { marginRight: 20 } ]}
            onPress={ this.props.closeModal }>
            <FontAwesome
              style={ header.graphic }>
              { Icons.close }
            </FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={ header.column }
            onPress={ () => this.submit() }>
            <FontAwesome
              style={ header.graphic }>
              { Icons.plus }
            </FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  public renderMain = () => {
    return (
      <View
        style={[ main.container, { flex: 7 } ]}>
        <View
          style={{ flex: 1 }}>
          <ExerciseDisplay
            exerciseName={ this.state.exerciseName }
            prefix={ this.state.prefix }
            suffix={ this.state.suffix }
            resistanceType={ this.state.resistanceType }
            weight={ this.state.weight }
            weightUnit={ this.state.weightUnit }
            reps={ this.state.reps }
            repType={ this.state.repType }
            muscleCategory={ this.state.muscleCategory }
            primaryMuscleGroup={ this.state.primaryMuscleGroup }
            secondaryMuscleGroup={ this.state.secondaryMuscleGroup }
            showPlaceholders={ true }>
          </ExerciseDisplay>
        </View>
        <ScrollView
          style={{ flex: 7 }}>
          <ExpandingInput
            baseHeight={ 50 }
            inputs={ this.exerciseInputs }
            reset={ this.state.resetExercises }
            title={{ icon: 'tag', label: 'Exercise' }}
            type='text'/>
          <ExpandingInput
            baseHeight={ 50 }
            inputs={ this.weightInputs }
            reset={ this.state.resetWeights }
            title={{ icon: 'tag', label: 'Resistance' }}
            type='text'/>
          <ExpandingInput
            baseHeight={ 50 }
            inputs={ this.repInputs }
            reset={ this.state.resetReps }
            title={{ icon: 'tag', label: 'Reps' }}
            type='text'/>
          <ExpandingInput
            baseHeight={ 50 }
            inputs={ this.groupInputs }
            reset={ this.state.resetGroups }
            title={{ icon: 'tag', label: 'Groups' }}
            type='picker'/>
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

 // render the <ToastComponent/>
 public renderToast = () => {
   if (this.state.toastIsMounted) {
     return (
       <ToastComponent
         subject={ this.toastSubject }
         timeout={ 3000 }
         toastMessage={ `${this.state.toastMessage}` }/>
     );
   }
 }

  public render () {
    return (
      <Modal
        animationType='slide'
        transparent={ false }
        visible={ this.props.isVisible }>
        <View
          style={ general.container }>
          <View
            style={ general.container }>
            { this.renderHeader() }
            { this.renderMain() }
          </View>
          <View>
            { this.renderToast() }
          </View>
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
