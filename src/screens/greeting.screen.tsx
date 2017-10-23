import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Styles } from '../styling/styles.styling';

// TODO: For now, typing is not working on this import. Ignore redlining on this import.
import * as auth from '../constants/authentication.helpers';

interface Props {
  name: string;
  navigation: any;
}

interface State {
  email: string;
  password: string;
  confirm: string;
}

export class GreetingScreen extends Component<Props, State> {

  private email = '';

  constructor (props) {
    super(props);
    this.isLoggedIn();
  }

  private isLoggedIn = () => {
    if (auth.isLoggedIn()) {
      this.props.navigation.navigate('landing');
    }
  }

  componentDidMount () {
    // this.setState({ text: '' });
  }

  static navigationOptions = {
    title: 'Up-Lift'
  };

  public buttonPress = () => {
    const { navigate } = this.props.navigation;
    navigate ('landing');
  }

  public signUp = () => {
    const { navigate } = this.props.navigation;
    navigate ('signup');
  }

  public render () {
    return (
      <View style={ styling.container }>
        <Text
          style={ styling.heading }>
          Welcome
        </Text>
        <Text
          style={ styling.text }>
          Lorem Ipsum Bad Jokes
        </Text>
        <View>
          <Text
            style={ styling.text }>
            Here is some description text. I should type a good bit here. Maybe that's enough.
          </Text>
          <Button
            color={ Styles.colors.secondary.main }
            onPress={ this.buttonPress }
            title='Landing' />
          <Button
            color={ Styles.colors.secondary.main }
            onPress={ this.signUp }
            title='Sign Up' />
        </View>
      </View>
    );
  }
}

const styling = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: Styles.colors.primary.dark,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingRight: 0,
    paddingBottom: 50,
    paddingLeft: 0
  },

  heading: {
    color: 'white',
    fontSize: Styles.textSizes.extraLarge
  },
  text: {
    color: Styles.colors.primary.light,
    fontSize: Styles.textSizes.normal,
    textAlign: 'center',
    padding: 10
  },
  button: {
    alignSelf: 'flex-end'
  }
});