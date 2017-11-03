import React, { Component } from 'react';
import { Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import { EXERCISENAMES } from '../constants/mock.data';

interface Props {

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

  public searchInputRender () {
    return (
      <View
        style={ textInput.container }>
        <TextInput
          style={ textInput.input }
          onChangeText={ text => this.setState({ searchText: text }) }
          value={ this.state.searchText }>
        </TextInput>
        <Text>{ this.state.searchText }</Text>
      </View>
    );
  }

  public pickerRender () {

    const itemRenderer = () => {
      const filteredExercises = EXERCISENAMES.filter(exerciseName => exerciseName.includes(this.state.searchText));
      return filteredExercises.map( (exerciseName, i) => {
        return (
          <Picker.Item key={ i } label={ exerciseName } value={ exerciseName } />
        );
      });
    };

    return (
      <View>
        <Picker
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
        <Text>
          Main Render for SearchPickerComponent
        </Text>
        { this.searchInputRender() }
        { this.pickerRender() }
      </View>
    );
  }
}

const textInput = StyleSheet.create({
  container: {},
  input: {}
});