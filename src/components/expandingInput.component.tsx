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
import { SubSearchPicker } from './subSearchPicker.component';
import { SubTextInput } from './subTextInput.component';

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
  choices?: string[];
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
          <SubTextInput
            key={ index }
            height={ this.props.baseHeight }
            icon={ input.icon }
            label={ input.label }
            stateSetter={ input.stateSetter }
            value={ input.value } />
        );
      });
    }
    if (this.props.type === 'picker' && this.state.isExpanded) {
      return this.props.inputs.map( (input, index) => {
        return (
          <SubSearchPicker
            key={ index }
            height={ this.props.baseHeight }
            icon={ input.icon }
            label={ input.label }
            choices={ this.props.choices }
            stateSetter={ input.stateSetter }/>
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
