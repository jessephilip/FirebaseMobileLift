import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

// screens
import { GreetingScreen } from './src/screens/greeting.screen';
import { LandingScreen } from './src/screens/landing.screen';
import { SignUpScreen } from './src/screens/signup.screen';

// tslint:disable-next-line:variable-name
const MobileLift = StackNavigator({
  'greeting': {
    screen: GreetingScreen
  },
  'landing': {
    screen: LandingScreen,
    navigationOptions: {
      title: 'Uplift'
    }
  },
  'signup': {
    screen: SignUpScreen,
    navigationOptions: {
      title: 'Sign Up'
    }
  }
});

export default class App extends Component {
  render () {
    return <MobileLift />;
  }
}
