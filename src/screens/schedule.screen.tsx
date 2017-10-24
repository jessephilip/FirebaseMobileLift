import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AppRegistry } from 'react-native';
import { Styles } from '../styling/styles.styling';
import { NoteButton } from '../components/noteButton';

interface Props {}
interface State {}

export class ScheduleScreen extends Component<Props, State> {

  constructor (props) {
    super(props);
  }

  public render () {
    return (
      <View>
        <NoteButton
          bottom={ -100 }
          left={ 10 }
          type='success'>
        </NoteButton>
        <NoteButton
          top={ -1 }
          right={ 10 }
          type='fail'>
        </NoteButton>
      </View>
    );
  }
}