import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

// screens
import { GreetingScreen } from './src/screens/greeting.screen';
import { SignUpScreen } from './src/screens/signup.screen';
import { LoginScreen } from './src/screens/login.screen';
import { TodayScreen } from './src/screens/today.screen';
import { ScheduleScreen } from './src/screens/schedule.screen';
import { ChallengesScreen } from './src/screens/challenges.screen';
import { ExerciseScreen } from './src/screens/exercise.screen';

// styles
import { Styles } from './src/styling/styles.styling';

// data
import { WORKOUT } from './src/constants/mock.data';

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

// tslint:disable-next-line:variable-name
const MobileLift = StackNavigator({
  'greeting': {
    screen: GreetingScreen
  },
  'landing': {
    screen: props => <TabNavigation />,
    navigationOptions: { title: 'Uplift' }
  },
  'signup': {
    screen: SignUpScreen,
    navigationOptions: {
      title: 'Sign Up'
    }
  },
  'login': {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login'
    }
  },
  'exercise': {
    screen: props => <ExerciseScreen workout={ WORKOUT }/>,
  },
}, {
  initialRouteName: 'greeting'
});

export default class App extends Component {
  render () {
    return  <MobileLift />;
  }
}
