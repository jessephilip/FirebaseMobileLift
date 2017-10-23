import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

// for tab navigation
import { TabNavigator } from 'react-navigation';
import { TodayScreen } from '../screens/today.screen';
import { ScheduleScreen } from '../screens/schedule.screen';
import { ChallengesScreen } from '../screens/challenges.screen';

// styling
import { Styles } from '../styling/styles.styling';

interface Props {}
interface State {}

// tslint:disable-next-line:variable-name
const TabNavigation = TabNavigator({
  Today: { screen: TodayScreen },
  Schedule: { screen: ScheduleScreen },
  Challenges: { screen: ChallengesScreen }
}, {
    animationEnabled: true,
    lazy: true,
    swipeEnabled: true,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: Styles.colors.secondary.main,
      inactiveTintColor: '#fff',
      inactiveBackgroundColor: Styles.colors.primary.main,
      activeBackgroundColor: Styles.colors.primary.light,
      labelStyle: {
        fontSize: Styles.textSizes.small
      },
      tabStyle: {
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  }
);

export class LandingScreen extends Component<Props, State> {

  constructor (props) {
    super(props);
  }

  public render () {
    return (
      <TabNavigation />
    );
  }
}
