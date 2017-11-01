import React, { Component } from 'react';
import { Text } from 'react-native';

interface Props {}
interface State {}

export class ScheduleScreen extends Component<Props, State> {

  constructor (props) {
    super(props);
  }

  public render () {
    return (
      <Text>This is the schedule screen.</Text>
    );
  }
}