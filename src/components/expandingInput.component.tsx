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
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';

import { Styles } from '../styling/styles.styling';

interface Props {
  baseHeight: number;
  inputs: {
    icon: string,
    label: string,
    value: string,
    stateSetter: (value) => void
  }[];
  title: { icon: string, label: string };
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
    if (this.state.isExpanded) {
      return this.props.inputs.map( (input, index) => {
        return (
          <SubComponent
            key={ index }
            height={ this.props.baseHeight }
            input={ input } />
        );
      });
    }
  }

  public expandableRender = () => {
    return (
      <View
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
          <TouchableOpacity
            onPress={ () => this.toggleExpansion() }>
            <Text
              style={[ expandable.expandIcon, { color: this.state.color } ]}>
              <FontAwesome>{ this.state.isExpanded ? Icons.chevronDown : Icons.chevronRight }</FontAwesome>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

class SubComponent extends Component <SubProps, SubState> {

  constructor (props) {
    super(props);
    this.state = {
      color: Styles.colors.primary.light,
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
        style={[ subComponent.view, { height: this.props.height } ]}>
        <Text
          style={[ subComponent.graphic, { color: this.state.color } ]}>
          <FontAwesome>
            { Icons[this.props.input.icon] }
          </FontAwesome>
        </Text>
        <TextInput
          style={[ subComponent.textInput, { borderColor: this.state.color } ]}
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

const subComponent = StyleSheet.create({
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