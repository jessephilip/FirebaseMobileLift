import React, { Component } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView, Picker, Switch, MaskedView } from 'react-native';

// third party components
import FontAwesome, { Icons } from 'react-native-fontawesome';

// styling
import { Styles } from '../styling/styles.styling';

// data models
import { Exercise } from '../constants/classes/exercise.model';
import { Workout } from '../constants/classes/workout.model';

import * as enums from '../constants/enums';
import { CustomTextInput } from './customTextInput';
import { MuscleCategory, MuscleGroup } from '../constants/enums';

interface Props {
  isVisible: boolean;
  closeModal: () => void;
}

interface State {
  exerciseName: string;
  muscleCategory: MuscleCategory;
  prefix: string;
  primaryMuscleGroup: MuscleGroup;
  repType: string;
  reps: number;
  resistanceType: string;
  secondaryMuscleGroup: MuscleGroup; // drop down with other
  suffix: string;
  weight: number | string;
  weightUnit: string;
  language: string;
}

export class CreateWorkoutModal extends Component<Props, State> {

  constructor (props) {
    super(props);
    this.state = {
      language: 'java'
    };
  }

  public renderHeader () {
    return (
      <View
        style={ header.container }>
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
    );
  }

  public renderMain = () => {
    return (
      <View
        style={ main.container }>
        <ScrollView>
          <CustomTextInput
            autoCapitalize={ enums.AutoCapitalize.none }
            autoFocus={ true }
            backgroundColor='white'
            keyboardType={ enums.KeyboardType['email-address'] }
            label='Exercise Name'
            onChangeText={ text => this.setState({ 'exerciseName': text }) }
            selectTextOnFocus={ true } />
          <CustomTextInput
            autoCapitalize={ enums.AutoCapitalize.none }
            backgroundColor='white'
            keyboardType={ enums.KeyboardType['email-address'] }
            label='Prefix'
            onChangeText={ text => this.setState({ 'prefix': text }) }
            selectTextOnFocus={ true } />
          <CustomTextInput
            autoCapitalize={ enums.AutoCapitalize.none }
            backgroundColor='white'
            keyboardType={ enums.KeyboardType['email-address'] }
            label='Suffix'
            onChangeText={ text => this.setState({ 'suffix': text }) }
            selectTextOnFocus={ true } />
          <CustomTextInput
            autoCapitalize={ enums.AutoCapitalize.none }
            backgroundColor='white'
            keyboardType={ enums.KeyboardType['email-address'] }
            label='Reps'
            onChangeText={ text => this.setState({ 'reps': text }) }
            selectTextOnFocus={ true } />
          <CustomTextInput
            autoCapitalize={ enums.AutoCapitalize.none }
            backgroundColor='white'
            keyboardType={ enums.KeyboardType['email-address'] }
            label='Rep Type'
            onChangeText={ text => this.setState({ 'repType': text }) }
            selectTextOnFocus={ true } />
          <CustomTextInput
            autoCapitalize={ enums.AutoCapitalize.none }
            backgroundColor='white'
            keyboardType={ enums.KeyboardType['email-address'] }
            label='Weight'
            onChangeText={ text => this.setState({ 'weight': text }) }
            selectTextOnFocus={ true } />
          <CustomTextInput
            autoCapitalize={ enums.AutoCapitalize.none }
            backgroundColor='white'
            keyboardType={ enums.KeyboardType['email-address'] }
            label='Weight Unit'
            onChangeText={ text => this.setState({ 'weightUnit': text }) }
            selectTextOnFocus={ true } />
          <CustomTextInput
            autoCapitalize={ enums.AutoCapitalize.none }
            backgroundColor='white'
            keyboardType={ enums.KeyboardType['email-address'] }
            label='Resistance Type'
            onChangeText={ text => this.setState({ 'resistanceType': text }) }
            selectTextOnFocus={ true } />
            <Switch></Switch>
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
    justifyContent: 'flex-end',
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
    padding: 20
  }
});

const footer = StyleSheet.create({
  container: {
    flex: 1
  }
});
