import React, { Component } from 'react';
import { Styles } from '../styling/styles.styling';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';

interface Props {
  height: number;
  icon: string;
  label: string;
  reset: boolean;
  value: string;
  stateSetter: (text) => void;
}

interface State {
  color: string;
  value: string;
}

export class SubTextInput extends Component <Props, State> {

  public componentRef;

  constructor (props) {
    super(props);
    console.log(this.props.value);
    this.state = {
      color: Styles.colors.primary.light,
      value: this.props.value
    };
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.reset !== this.props.reset && this.props.reset) {
      console.log('componentDidUpdate reset');
      this.setState({ value: '' });
    }
  }

  public onChangeText = (text: string): void => {
    this.setState({ value: text });
    this.props.stateSetter(text);
  }

  public render () {
    return (
      <View
        style={[ subText.view, { height: this.props.height } ]}>
        <Text
          style={[ subText.graphic, { color: this.state.color } ]}>
          <FontAwesome>
            { Icons[this.props.icon] }
          </FontAwesome>
        </Text>
        <TextInput
          style={[ subText.textInput, { borderColor: this.state.color } ]}
          onBlur={ () => this.setState({ color: Styles.colors.primary.light }) }
          onChangeText={ text => this.onChangeText(text) }
          onFocus={ () => this.setState({ color: Styles.colors.secondary.light }) }
          placeholder={ this.props.label }
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