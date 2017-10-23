import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AppRegistry, ScrollView } from 'react-native';
import { Styles } from '../styling/styles.styling';
import { ChallengeCard } from '../components/challengeCard.component';

import { CURRENTCHALLENGES } from '../constants/mock.data';
import { PASTCHALLENGES } from '../constants/mock.data';

interface Props {}
interface State {}

export class ChallengesScreen extends Component<Props, State> {

  constructor (props) {
    super(props);
  }

  // creates list of active ChallengeCard elements to be placed in render function
  public createCurrentChallenges = (): JSX.Element[] => {
    const current = CURRENTCHALLENGES.map((challenge, i) => {
      return (
        <View
          key={ 'view' + i }
          style={ styling.challengeCard }>
          <ChallengeCard
            key={ i }
            amount={ challenge.amount }
            exercise={ challenge.exercise }
            isActiveChallenge={ true }
            muscleGroup={ challenge.muscleGroup }
            name={ challenge.name }
            points={ challenge.points }
            type={ challenge.type }/>
        </View>
      );
    });
    return current;
  }

  // creates list of inactive ChallengeCard elements to be placed in render function
  public createPastChallenges = (): JSX.Element[] => {
    const past = PASTCHALLENGES.map((challenge, i) => {
      return (
        <View
          key={ 'view' + i }
          style={ styling.challengeCard }>
          <ChallengeCard
            key={ i }
            amount={ challenge.amount }
            exercise={ challenge.exercise }
            muscleGroup={ challenge.muscleGroup }
            name={ challenge.name }
            points={ challenge.points }
            type={ challenge.type }/>
        </View>
      );
    });
    return past;
  }

  public render () {
    return (
      <View>
        <Text
          style={ styling.challengesHeading }>
          Current Challenges
        </Text>
        { this.createCurrentChallenges() }
        <Text
          style={ styling.challengesHeading }>
          Completed Challenges
        </Text>
        <ScrollView>
          { this.createPastChallenges() }
        </ScrollView>
      </View>
    );
  }
}

const styling = StyleSheet.create({
  challengeCard: {
    marginTop: 5,
    marginRight: 20,
    marginBottom: 5,
    marginLeft: 20
  },
  challengesHeading: {
    fontSize: Styles.textSizes.small
  }
});