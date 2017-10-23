import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Styles } from '../styling/styles.styling';
import * as enums from '../constants/enums';

interface Props {
  autoCapitalize?: enums.AutoCapitalize;
  autoFocus?: boolean;
  onBlur?: () => void;
  keyboardType?: enums.KeyboardType;
  label?: string;
  onChangeText?: any;
  onFocus?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  selectTextOnFocus?: boolean;
  wrapperStyle?: any;
}

interface State {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  labelTextColor: string;
  text: string;
}

export class CustomTextInput extends Component<Props, State> {
  constructor (props, private hasLabel) {
    super(props);
    this.state = {
      backgroundColor: Styles.colors.primary.dark,
      borderColor: 'gray',
      borderWidth: 1,
      labelTextColor: Styles.colors.primary.main,
      text: ''
    };
    this.hasLabel = Boolean(this.props.label);
  }

  private onBlur = () => {
    this.setState({
      backgroundColor: Styles.colors.primary.dark,
      borderColor: 'gray',
      borderWidth: 1,
      labelTextColor: Styles.colors.primary.light,
    });
  }

  private onFocus = () => {
    this.setState({
      backgroundColor: 'white',
      borderColor: Styles.colors.secondary.main,
      borderWidth: 3,
      labelTextColor: Styles.colors.secondary.main,
    });
  }

  private onChangeText = (text: string): void => {
    this.setState({ 'text': text });
    console.log('state text', this.state.text);
  }

  public label = () => {
    if (this.hasLabel) {
      return (
        <View
          style={ styling.labelView }>
          <Text
            style={{ color: this.state.labelTextColor }}>
            { this.props.label }
          </Text>
        </View>
      );
    }
  }

  public render () {
    return (
      <View
        style={ this.props.wrapperStyle }>
        { this.label() }
        <View
          style={{ backgroundColor: this.state.backgroundColor }}>
          <TextInput
            style={[
              styling.textInputWithoutFocus,
              {
                borderColor: this.state.borderColor,
                borderWidth: this.state.borderWidth
              }
            ]}
            autoCapitalize={ this.props.autoCapitalize || enums.AutoCapitalize.none }
            autoFocus={ this.props.autoFocus || false }
            onBlur={ this.props.onBlur || this.onBlur }
            onChangeText={ this.props.onChangeText || this.onChangeText }
            onFocus={ this.props.onFocus || this.onFocus }
            placeholder={ this.props.placeholder }
            secureTextEntry={ this.props.secureTextEntry || false }
            selectTextOnFocus={ this.props.selectTextOnFocus || false }
          />
        </View>
      </View>
    );
  }
}

const styling = StyleSheet.create({
  textInputWithoutFocus: {
    borderWidth: 1,
    color: 'black',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: 300
  },
  labelView: {
    paddingBottom: 5
  }
});