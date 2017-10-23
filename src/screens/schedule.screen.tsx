import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AppRegistry } from 'react-native';
import { Styles } from '../styling/styles.styling';

interface Props {}
interface State {}

export class ScheduleScreen extends Component<Props, State> {

  constructor (props) {
    super(props);
  }

  public render () {
    return (
      <Text>This is the Schedule Screen</Text>
    );
  }
}