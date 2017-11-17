/**
 * <ExpandingInput> has a collapsed form and expands to reveal text inputs.
 *
 * input.stateSetter is used to set the state in the parent component.
 * input.stateSetter should be similar to this:
 *   value => this.setState({ exerciseName: value });
 *
 * Example:
 * <ExpandingInput
 *  baseHeight={ 75 }
 *  inputs={[
 *    { icon: 'user', label: 'Exercise Name', value: this.state.exerciseName, stateSetter: this.exerciseNameSetter },
 *    { icon: 'send', label: 'Prefix', value: this.state.prefix, stateSetter: this.prefixSetter },
 *    { icon: 'check', label: 'Suffix', value: this.state.suffix, stateSetter: this.suffixSetter }
 * ]}
 * title={{ icon: 'tag', label: 'Exercise' }} />
 *
 * @requires baseHeight: number
 * @requires inputs: { icon: string, label: string, value: string, stateSetter: (value) => void }[]
 * @requires title: { icon: string, label: string }
 * @export
 * @class ExpandingInput
 * @extends {Component<Props, State>}
 */

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';

import { Styles } from '../styling/styles.styling';
import { SearchPicker } from './searchPicker.component';
import { MuscleGroup } from '../constants/enums';

interface Props {
  baseHeight: number;
  inputs: {
    icon: string,
    label: string,
    value: string,
    stateSetter: (value) => void
  }[];
  title: { icon: string, label: string };
  type: string;
}

interface State {
  color: string;
  height: number;
  isExpanded: boolean;
}

export class ExpandingInput extends Component <Props, State> {

  constructor (props) {
    super(props);
    this.state = {
      color: Styles.colors.primary.light,
      height: this.props.baseHeight,
      isExpanded: false,
    };
  }

  public toggleExpansion = (): void => {
    this.setState({ isExpanded: !this.state.isExpanded });
    if (this.state.isExpanded) {
      this.setState({ height: this.props.baseHeight });
      this.setState({ color: Styles.colors.primary.light });
    } else {
      this.setState({ height: this.props.baseHeight * (this.props.inputs.length + 1) });
      this.setState({ color: Styles.colors.secondary.light });
    }
  }

  public subComponentRender = () => {
    if (this.props.type === 'text' && this.state.isExpanded) {
      return this.props.inputs.map( (input, index) => {
        return (
          <SubText
            key={ index }
            index={ index }
            height={ this.props.baseHeight }
            input={ input } />
        );
      });
    }
    if (this.props.type === 'picker' && this.state.isExpanded) {
      return this.props.inputs.map( (input, index) => {
        return (
          <SubPicker
            key={ index }
            index={ index }
            height={ this.props.baseHeight }
            input={ input }/>
        );
      });
    }
  }

  public expandableRender = () => {
    return (
      <TouchableOpacity
        onPress={ () => this.toggleExpansion() }
        style={[ expandable.container ]}>
        <View
          style={ expandable.iconAndLabel }>
          <Text
            style={{ color: this.state.color, fontSize: Styles.textSizes.normal }}>
            <FontAwesome>
              { Icons[this.props.title.icon] }
            </FontAwesome>
          </Text>
          <Text
            style={[ expandable.labelText, { color: this.state.color } ]}>
            { this.props.title.label }
          </Text>
        </View>
        <View>
          <View>
            <Text
              style={[ expandable.expandIcon, { color: this.state.color } ]}>
              <FontAwesome>{ this.state.isExpanded ? Icons.chevronDown : Icons.chevronRight }</FontAwesome>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  public render () {
    return (
      <View
        style={[ container.view, { height: this.state.height } ]}>
        { this.expandableRender() }
        { this.subComponentRender() }
      </View>
    );
  }
}

const container = StyleSheet.create({
  view: {
    flexDirection: 'column',
  }
});

const expandable = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: Styles.colors.primary.light,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  },
  iconAndLabel: {
    flexDirection: 'row'
  },
  labelText: {
    color: Styles.colors.primary.light,
    fontSize: Styles.textSizes.normal,
    marginLeft: 20
  },
  expandIcon: {
    color: Styles.colors.primary.light,
    fontSize: Styles.textSizes.normal
  }
});

interface SubProps {
  height: number;
  index: number;
  input: {
    icon: string,
    label: string,
    value: string,
    stateSetter: (value) => void
  };
}

interface SubState {
  color: string;
  value: string;
}

class SubText extends Component <SubProps, SubState> {

  public componentRef;

  constructor (props) {
    super(props);
    this.state = {
      color: Styles.colors.primary.light,
      value: this.props.input.value
    };
  }

  componentDidMount () {
    const index = `input${this.props.index}`;
    this.componentRef = this.refs[index];
    if (index === 'input0') {
      this.componentRef.focus();
    }
  }

  public onChangeText = (text: string): void => {
    this.setState({ value: text });
    this.props.input.stateSetter(text);
  }

  public render () {
    return (
      <View
        style={[ subText.view, { height: this.props.height } ]}>
        <Text
          style={[ subText.graphic, { color: this.state.color } ]}>
          <FontAwesome>
            { Icons[this.props.input.icon] }
          </FontAwesome>
        </Text>
        <TextInput
          ref={ `input${this.props.index}` }
          style={[ subText.textInput, { borderColor: this.state.color } ]}
          onBlur={ () => this.setState({ color: Styles.colors.primary.light }) }
          onChangeText={ text => this.onChangeText(text) }
          onFocus={ () => this.setState({ color: Styles.colors.secondary.light }) }
          placeholder={ this.props.input.label }
          placeholderTextColor={ Styles.colors.primary.light }
          selectionColor={ this.state.color }
          value={ this.state.value }>
        </TextInput>
      </View>
    );
  }
}

const subText = StyleSheet.create({
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
  }
});

interface PickerProps {
  height: number;
  index: number;
  input: {
    icon: string,
    label: string,
    value: string,
    stateSetter: (value) => void
  };
}

interface PickerState {
  color: string;
  modalIsVisible: boolean;
  value: string;
}

class SubPicker extends Component <PickerProps, PickerState> {

  public componentRef;

  constructor (props) {
    super(props);
    this.state = {
      color: Styles.colors.primary.light,
      modalIsVisible: false,
      value: this.props.input.value
    };
  }

  public onChangeText = (text: string): void => {
    this.setState({ value: text });
    this.props.input.stateSetter(text);
  }

  public render () {
    return (
      <View
        style={[ subPicker.view, { height: this.props.height } ]}>
        <Text
          style={[ subPicker.graphic, { color: this.state.color } ]}>
          <FontAwesome>
            { Icons[this.props.input.icon] }
          </FontAwesome>
        </Text>
        <TouchableOpacity
          onPress={ () => this.setState({ modalIsVisible: true }) }>
          <Text>
            { this.props.input.label }
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
            <View
              style={ subPicker.modalMain }>
              <SearchPicker
                choices={ MuscleGroup }
                values={ this.props.input.value }></SearchPicker>
            </View>
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
    backgroundColor: 'white',
    flex: 4,
    justifyContent: 'center',
  },
  modalFooter: {
    flex: 2
  }
});