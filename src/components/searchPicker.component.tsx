import React, { Component } from 'react';
import { Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import { EXERCISENAMES } from '../constants/mock.data';
import * as enums from '../constants/enums';

interface Props {
  choices: any;
}

interface State {
  pickerValue: string;
  searchText: string;
}

export class SearchPicker extends Component <Props, State> {

  constructor (props) {
    super(props);
    this.state = {
      pickerValue: '',
      searchText: ''
    };
  }

  componentDidMount () {
    console.log(this.props.choices);
  }

  public searchInputRender () {
    return (
      <View
        style={ textInput.container }>
        <TextInput
          style={ textInput.input }
          autoCapitalize={ enums.AutoCapitalize.none }
          autoFocus={ true }
          onChangeText={ text => this.setState({ searchText: text }) }
          value={ this.state.searchText }>
        </TextInput>
      </View>
    );
  }

  public pickerRender () {

    const itemRenderer = () => {
      const filteredExercises = EXERCISENAMES.filter(exerciseName => exerciseName.toLowerCase().includes(this.state.searchText.toLowerCase()));
      return filteredExercises.map( (exerciseName, i) => {
        return (
          <Picker.Item
            key={ i }
            label={ exerciseName }
            value={ exerciseName } />
        );
      });
    };

    return (
      <View>
        <Picker
          style={ picker.input }
          selectedValue={ this.state.pickerValue }
          onValueChange={ (itemValue, itemIndex) => this.setState({ pickerValue: itemValue }) }>
          { itemRenderer() }
        </Picker>
      </View>
    );
  }

  public render () {
    return (
      <View>
        { this.searchInputRender() }
        { this.pickerRender() }
      </View>
    );
  }
}

const textInput = StyleSheet.create({
  container: {},
  input: {
    textAlign: 'center'
  }
});

const picker = StyleSheet.create({
  container: {},
  input: {
  },
});