import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from '../styling/styles.styling';

interface Props {
  type: string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface State {
  backgroundColor: string;
}

export class NoteButton extends Component<Props, State> {
  constructor (props, private bottom) {
    super(props);
    this.state = {
      backgroundColor: 'yellow'
    };
  }

  componentDidMount () {
    this.setTypeSettings();
  }

  public setTypeSettings = (): void => {
    switch (this.props.type) {
      case 'success':
        this.setState({ backgroundColor: Styles.colors.success });
        break;
      case 'fail':
        this.setState({ backgroundColor: Styles.colors.fail });
        break;
      default:
        throw new Error(`Wrong type, "${this.props.type}" provided to <NoteButton>.`);
    }
  }

  public createMark = () => {
    switch (this.props.type.toLowerCase()) {
      case 'success':
        return (
          <Text
            style={ styling.checkmark }>
            &#10003;
          </Text>
        );
      case 'fail':
        return (
          <Text
            style={ styling.checkmark }>
            &times;
          </Text>
        );
      default:
        throw new Error(`Wrong type, "${this.props.type}" provided to <NoteButton>.`);
    }
  }

  public render () {
    return (
      <TouchableOpacity
        style={ [
          styling.container,
          { backgroundColor: this.state.backgroundColor },
          { top: this.props.top, right: this.props.right, bottom: this.props.bottom, left: this.props.left }
        ] }>
        { this.createMark() }
      </TouchableOpacity>
    );
  }
}

const buttonHeight = 60;
const buttonWidth = 60;
const borderRadius = buttonHeight / 2;

const styling = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: borderRadius,
    height: buttonHeight,
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: Styles.shadows.iosBoxShadow.shadowColor,
    shadowOffset: Styles.shadows.iosBoxShadow.shadowOffset,
    shadowOpacity: Styles.shadows.iosBoxShadow.shadowOpacity,
    shadowRadius: Styles.shadows.iosBoxShadow.shadowRadius,
    width: buttonWidth,
  },
  checkmark: {
    color: 'white',
    fontSize: Styles.textSizes.normal,
    fontWeight: 'bold',
    textShadowColor: Styles.shadows.textShadow.textShadowColor,
    textShadowOffset: Styles.shadows.textShadow.textShadowOffset,
    textShadowRadius: Styles.shadows.textShadow.textShadowRadius
  }
});