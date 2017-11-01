import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/*  THIRD PARTY  */
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome, { Icons } from 'react-native-fontawesome';

/*  CUSTOM  */
import { Styles } from '../styling/styles.styling';
import { Exercise } from '../constants/classes/exercise.model';

interface Props {
  exercise: Exercise;
  nextExercise: Exercise;
  prevExercise: Exercise;
  incExercise: () => void;
  decExercise: () => void;
  showBack: boolean;
  showNext: boolean;
}
interface State {
  buttonState: ButtonState;
}

enum ButtonState {
  both = 'both',
  fail = 'fail',
  success = 'success'
}

export class ExerciseScreenBarButtons extends Component <Props, State> {
  constructor (props) {
    super(props);

    this.state = {
      buttonState: ButtonState.both
    };
  }

  public render () {
    return (
      <View
        style={ general.container }>
        <View
          style={ general.saveBar }>
          <TouchableOpacity
            style={ general.graphicTouch }
            onPress={ this.props.decExercise }>
            { this.showButtonPreviousExercise() }
          </TouchableOpacity>
          <TouchableOpacity
            style={ general.graphicTouch }
            onPress={ this.props.incExercise }>
            { this.showButtonNextExercise() }
          </TouchableOpacity>
        </View>
        <View
          style={ general.buttons }>
          { this.whichButtons() }
        </View>
      </View>
    );
  }

  public resetNotes = (): void => {
    this.setState({ buttonState: ButtonState.both });
  }

  public whichButtons = () => {
    if (this.state.buttonState === ButtonState.both) {
      return this.failOrSuccessButtons();
    }

    if (this.state.buttonState === ButtonState.fail) {
      return this.failButtons();
    }

    if (this.state.buttonState === ButtonState.success) {
      return this.successButtons();
    }
  }

  public failOrSuccessButtons () {
    return (
      <View
        style={ general.buttons }>
        <TouchableOpacity
          style={ general.touchOpacity }
          onPress={ () => this.setState({ buttonState: ButtonState.fail }) }>
          <LinearGradient
            style={[ general.touchOpacity, general.linearGradient ]}
            colors={[ gradients.redStart, gradients.redEnd, gradients.redStart ]}>
            <Text
              style={ general.text }>
              <FontAwesome>{Icons.times}</FontAwesome>
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={ general.touchOpacity }
          onPress={ () => this.setState({ buttonState: ButtonState.success }) }>
          <LinearGradient
            style={[ general.touchOpacity, general.linearGradient ]}
            colors={ [gradients.greenStart, gradients.greenEnd, gradients.greenStart] }>
            <Text
              style={ general.text }>
              <FontAwesome>{Icons.check}</FontAwesome>
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  public failButtons = () => {
    return (
      <View
        style={[ general.buttons, general.fail ]}>
        <TouchableOpacity
          style={[ general.subButton, general.touchOpacity ]}
          onPress={ this.resetNotes }>
          <Text
            style={[ general.subButtonText, general.graphicButton ]}>
            <FontAwesome>{ Icons.undo }</FontAwesome>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ general.subButton, general.touchOpacity ]}>
          <Text
            style={ [general.subButtonText, general.graphicButton] }>
            <FontAwesome>{ Icons.arrowDown }</FontAwesome>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ general.subButton, general.touchOpacity ]}>
          <Text
            style={ [general.subButtonText, general.graphicButton] }>
            <FontAwesome>{ Icons.fastForward }</FontAwesome>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ general.subButton, general.touchOpacity ]}>
          <Text
            style={ [general.subButtonText, general.graphicButton] }>
            <FontAwesome>{ Icons.bars }</FontAwesome>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  public successButtons = () => {
    return (
      <View
        style={[ general.buttons, general.success ]}>
        <TouchableOpacity
          style={[ general.subButton, general.touchOpacity ]}
          onPress={ this.resetNotes }>
          <Text
            style={ [general.subButtonText, general.graphicButton] }>
            <FontAwesome>{Icons.undo}</FontAwesome>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ general.subButton, general.touchOpacity ]}>
          <Text
            style={[ general.subButtonText, general.graphicButton ]}>
            <FontAwesome>{ Icons.arrowUp }</FontAwesome>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ general.subButton, general.touchOpacity ]}>
          <Text
            style={[ general.subButtonText, general.graphicButton ]}>
            <FontAwesome>{ Icons.thumbsUp }</FontAwesome>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ general.subButton, general.touchOpacity ]}>
          <Text
            style={[ general.subButtonText, general.graphicButton ]}>
            <FontAwesome>{ Icons.bars }</FontAwesome>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  public showButtonPreviousExercise () {
    if (this.props.showBack) {
      return (
        <View
          style={ general.column }>
          <FontAwesome
            style={[ general.graphicButton, { color: 'white'} ]}>
            { Icons.backward }
          </FontAwesome>
          <Text
            style={{ color: 'white', marginTop: 10 }}>
            {this.props.prevExercise.name}
          </Text>
        </View>
      );
    }
  }

  public showButtonNextExercise () {
    if (this.props.showNext) {
      return (
        <View
          style={ general.column }>
          <FontAwesome
            style={[ general.graphicButton, { color: 'white'} ]}>
            { Icons.forward }
          </FontAwesome>
          <Text
            style={{ color: 'white', marginTop: 10 }}>
            {this.props.nextExercise.name}
          </Text>
        </View>
      );
    }
  }
}

const gradients = {
  greenStart: Styles.colors.gradients.green.start,
  greenEnd: Styles.colors.gradients.green.end,
  redStart: Styles.colors.gradients.red.start,
  redEnd: Styles.colors.gradients.red.end,
};

const general = StyleSheet.create({
  column: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  container: {
    flex: 8,
    flexDirection: 'column'
  },
  buttons: {
    flex: 4,
    flexDirection: 'row'
  },
  fail: {
    backgroundColor: Styles.colors.fail
  },
  graphicButton: {
    fontSize: Styles.textSizes.normal
  },
  graphicTouch: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  linearGradient: {
    alignSelf: 'stretch',
    flex: 1,
  },
  saveBar: {
    alignItems: 'center',
    backgroundColor: Styles.colors.primary.dark,
    // backgroundColor: 'rgba(41,67,78,0.75)',
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subButton: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  subButtonText: {
    color: 'white',
    fontSize: Styles.textSizes.extraSmall,
    textAlign: 'center'
  },
  success: {
    backgroundColor: Styles.colors.success
  },
  text: {
    color: 'white',
    fontSize: Styles.textSizes.normal,
    fontWeight: 'bold',
    textShadowColor: Styles.shadows.textShadow.textShadowColor,
    textShadowOffset: Styles.shadows.textShadow.textShadowOffset,
    textShadowRadius: Styles.shadows.textShadow.textShadowRadius
  },
  touchOpacity: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 4,
    justifyContent: 'center'
  }
});
