import React, { Component } from 'react';
import { Picker, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import * as enums from '../constants/enums';
import { Styles } from '../styling/styles.styling';
import { BehaviorSubject } from 'rxjs-es';

interface Props {
  choices: string[];
  closeModal: () => void;
  stateSetter: (value) => void;
  valueSubject?: BehaviorSubject<string>;
  title?: string;
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

  public done = value => {
    if (value === 'cancel') {
      this.props.closeModal();
    } else {
      this.props.stateSetter(this.state.pickerValue);
      this.props.valueSubject.next(this.state.pickerValue);
      this.props.closeModal();
    }
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
          placeholder='filter categories'
          value={ this.state.searchText }>
        </TextInput>
      </View>
    );
  }

  public pickerRender () {

    const itemRenderer = () => {
      const filteredChoices = this.props.choices.filter(exerciseName => exerciseName.toLowerCase().includes(this.state.searchText.toLowerCase()));
      return filteredChoices.map( (choice, i) => {
        return (
          <Picker.Item
            key={ i }
            label={ choice }
            value={ choice } />
        );
      });
    };

    return (
      <Picker
        style={ picker.input }
        selectedValue={ this.state.pickerValue }
        onValueChange={ (itemValue, itemIndex) => this.setState({ pickerValue: itemValue }) }>
        { itemRenderer() }
      </Picker>
    );
  }

  public renderFooter () {
    return (
      <View
        style={ container.footer }>
        <TouchableOpacity
          onPress={ () => this.done('cancel') }>
          <Text
            style={{ color: Styles.colors.fail }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ () => this.done('confirm') }>
          <Text
            style={{ color: Styles.colors.success }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  public render () {
    return (
      <View
        style={{ backgroundColor: 'white' }}>
        <View
          style={ container.headerView }>
          <Text
            style={ container.headerText }>
            { this.props.title }
          </Text>
        </View>
        <View
          style={ container.main }>
          { this.searchInputRender() }
          { this.pickerRender() }
        </View>
        { this.renderFooter() }
      </View>
    );
  }
}

const container = StyleSheet.create({
  headerView: {
    alignItems: 'center',
    backgroundColor: Styles.colors.primary.dark,
    height: 50,
    justifyContent: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: Styles.textSizes.normal
  },
  main: {},
  footer: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  }
});

const textInput = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 100,
    justifyContent: 'center'
  },
  input: {
    textAlign: 'center'
  }
});

const picker = StyleSheet.create({
  container: {},
  input: {},
});