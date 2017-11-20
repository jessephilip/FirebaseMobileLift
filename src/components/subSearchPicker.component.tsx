import React, { Component } from 'react';
import { SearchPicker } from './searchPicker.component';
import { Styles } from '../styling/styles.styling';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import FontAwesome, { Icons } from 'react-native-fontawesome';

interface Props {
  height: number;
  icon: string;
  label: string;
  choices: string[];
  stateSetter: (value) => void;
}

interface State {
  color: string;
  modalIsVisible: boolean;
}

export class SubSearchPicker extends Component <Props, State> {

  public label = this.props.label;
  public pickerValue = new BehaviorSubject(undefined);
  public pickerSubscription = this.pickerValue.subscribe(value => {
    if (value) {
      this.label = `${this.props.label} - ${value}`;
    } else {
      this.label = this.props.label;
    }
  });

  public componentRef;

  public closeModal = () => this.setState({ modalIsVisible: false });

  constructor (props) {
    super(props);
    this.state = {
      color: Styles.colors.primary.light,
      modalIsVisible: false
    };
  }

  public render () {
    return (
      <View
        style={[ subPicker.view, { height: this.props.height } ]}>
        <Text
          style={[ subPicker.graphic, { color: this.state.color } ]}>
          <FontAwesome>
            { Icons[this.props.icon] }
          </FontAwesome>
        </Text>
        <TouchableOpacity
          onPress={ () => this.setState({ modalIsVisible: true }) }>
          <Text>
            { this.label }
          </Text>
        </TouchableOpacity>
        <Modal
          animationType='slide'
          transparent={ true }
          visible={ this.state.modalIsVisible }>
          <View
            style={ subPicker.modalView }>
            <TouchableOpacity
              style={ subPicker.modalHeader }
              onPress={ () => this.setState({ modalIsVisible: false })}>
            </TouchableOpacity>
            <SearchPicker
              choices={ this.props.choices }
              closeModal={ this.closeModal }
              stateSetter={ this.props.stateSetter }
              valueSubject={ this.pickerValue }
              title={ this.props.label }>
            </SearchPicker>
            <TouchableOpacity
              style={ subPicker.modalFooter }
              onPress={ () => this.setState({ modalIsVisible: false })}>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const subPicker = StyleSheet.create({
  view: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Styles.colors.primary.light,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20
  },
  graphic: {
    color: Styles.colors.primary.light,
    fontSize: Styles.textSizes.normal,
    marginRight: 20,
    width: 25
  },
  textInput: {
    borderWidth: 0.5,
    flex: 1,
    paddingLeft: 10,
    height: 40,
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    flex: 1,
    justifyContent: 'space-between'
  },
  modalHeader: {
    flex: 2
  },
  modalMain: {
    backgroundColor: 'green',
    flex: 4,
    justifyContent: 'center',
  },
  modalFooter: {
    flex: 2
  }
});