import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AppRegistry } from 'react-native';
import { Styles } from '../styling/styles.styling';

import { weekdayConverter } from '../constants/dateConverter';
import { monthConverter } from '../constants/dateConverter';
import { ChallengeCard } from '../components/challengeCard.component';

interface Props {}
interface State {}

export class TodayScreen extends Component<Props, State> {

  constructor (props) {
    super(props);
  }

  private getDate = (): string => {
    const dateObject = new Date()
    , month = dateObject.getMonth() + 1
    , day = dateObject.getDate()
    , year = dateObject.getFullYear()
    ;

    return `${ monthConverter(month) } ${ day }, ${ year }`;
  }

  public render () {
    return (
      <View
        style={ styling.container }>
        <Text
          style={ styling.date }>
          { this.getDate() }
        </Text>
        <View
          style={ styling.exerciseView }>
          <Text
            style={ styling.exerciseTitle }>
            { 'No exercise planned' }
          </Text>
        </View>
      </View>
    );
  }
}

const styling = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  date: {
    backgroundColor: Styles.colors.secondary.main,
    color: 'white',
    fontSize: Styles.textSizes.normal,
    padding: 10,
    textAlign: 'center',
    textShadowColor: Styles.shadows.textShadow.textShadowColor,
    textShadowOffset: Styles.shadows.textShadow.textShadowOffset,
    textShadowRadius: Styles.shadows.textShadow.textShadowRadius
  },
  exerciseView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: Styles.colors.secondary.dark,
    height: 150,
    justifyContent: 'center'
  },
  exerciseTitle: {
    fontSize: Styles.textSizes.normal,
    textAlign: 'center'
  }
});