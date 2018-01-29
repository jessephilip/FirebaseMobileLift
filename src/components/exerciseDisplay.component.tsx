import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// third party components
import FontAwesome, { Icons } from 'react-native-fontawesome';

// styling
import { Styles } from '../styling/styles.styling';

import * as enums from '../constants/enums';
import { MUSCLECATEGORY, MUSCLEGROUP } from '../constants/mock.data';

interface Props {
  exerciseName?: string;
  prefix?: string;
  suffix?: string;
  muscleCategory?: string;
  primaryMuscleGroup?: string;
  secondaryMuscleGroup?: string;
  weight?: string;
  weightUnit?: string;
  reps?: string;
  repType?: string;
  resistanceType?: string;
  height?: number;

  showPlaceholders?: boolean;
}

interface State {}

export class ExerciseDisplay extends Component <Props, State> {

  public placeholders = {
    exerciseName: 'name',
    prefix: 'prefix',
    suffix: 'suffix',
    muscleCategory: 'category',
    primaryMuscleGroup: 'primary',
    secondaryMuscleGroup: 'secondary',
    weight: 'weight',
    weightUnit: 'weight unit',
    reps: 'reps',
    repType: 'rep type',
    resistanceType: 'resistance type',
  };

  public setPlaceholders (input: string): string {
    if (this.props.showPlaceholders) {
      return this.placeholders[input];
    }
    return '';
  }

  constructor (props) {
    super(props);
  }

  componentDidUpdate () {
    console.log('exerciseDisplay updated');
  }

  public setCategoryIcon () {
    if (this.props.muscleCategory !== 'none') {
      let icon;
      switch (this.props.muscleCategory) {
        case 'arms':
          return (
            <Image source={ require('../../assets/icons-96/muscle.png') }/>
          );
        case 'back':
          return (
            <Image source={ require('../../assets/icons-96/back.png') }/>
          );
        case 'chest':
          return (
            <Image source={ require('../../assets/icons-96/chest.png') }/>
          );
        case 'core':
          return (
            <Image source={ require('../../assets/icons-96/prelum.png') }/>
          );
        case 'glutes':
          return (
            <Image source={ require('../../assets/icons-96/bottom.png') }/>
          );
        case 'legs':
          return (
            <Image source={ require('../../assets/icons-96/leg.png') }/>
          );
        case 'shoulders':
          return (
            <Image source={ require('../../assets/icons-96/shoulders.png') }/>
          );
        default:
          return undefined;
      }
    }
  }

  public renderMain () {

    /*  MAIN-TOP  */
    const renderMainTop = () => {
      return (
        <View
          style={ main.top }>
          <View
            style={ main.nameView }>
            <Text
              style={ main.nameText }>
              { this.props.exerciseName || this.setPlaceholders('exerciseName') }
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
            <Text
              style={{
                color: Styles.colors.primary.main,
                fontSize: Styles.textSizes.normal
              }}>
              { this.props.prefix || this.setPlaceholders('prefix') }
            </Text>
            <Text
              style={{
                color: Styles.colors.primary.main,
                fontSize: Styles.textSizes.normal
              }}>
              { this.props.suffix || this.setPlaceholders('suffix') }
            </Text>
          </View>
        </View>
      );
    };

    /*  MAIN-MIDDLE  */
    const renderMainMiddle = () => {

      function displayGroupHeaders (muscleGroup: string) {
        if (muscleGroup === 'primaryMuscleGroup') {
          return 'Primary';
        } else if (muscleGroup === 'secondaryMuscleGroup') {
          return 'Secondary';
        } else {
          return '';
        }
      }

      const renderMuscleGroup = muscleGroup => {
        if (this.props[muscleGroup] !== 'none') {
          return (
            <View
              style={ main.muscleGroup }>
              <Text
                style={ main.metaText }>
                { displayGroupHeaders(muscleGroup) }
              </Text>
              <Text
                style={ main.muscleGroupText }>
                { this.props[muscleGroup] }
              </Text>
            </View>
          );
        }
      };

      return (
        <View
          style={ main.middle }>
          <View
            style={ main.weightAndRepRow }>
            <View
              style={ main.weightView }>
              <Text
                style={{
                  color: Styles.colors.primary.main,
                  fontSize: Styles.textSizes.large
                }}>
                { this.props.weight || this.setPlaceholders('weight') }
              </Text>
              <Text
                style={ main.metaText }>
                { this.props.weightUnit || this.setPlaceholders('weightUnit') }
              </Text>
            </View>
            <View
              style={ main.weightView }>
              <Text
                style={{
                  color: Styles.colors.primary.main,
                  fontSize: Styles.textSizes.large
                }}>
                { this.props.reps || this.setPlaceholders('reps') }
              </Text>
              <Text
                style={ main.metaText }>
                { this.props.repType || this.setPlaceholders('repType') }
              </Text>
            </View>
          </View>
          <View
            style={ main.muscleGroupsRow }>
            { renderMuscleGroup('primaryMuscleGroup') }
            { renderMuscleGroup('secondaryMuscleGroup') }
          </View>
        </View>
      );
    };

    /*  MAIN-BOTTOM  */
    const renderMainBottom = () => {
      return (
        <View
          style={ main.bottom }>
        </View>
      );
    };

    return (
      <View
        style={ main.view }>
        <View
          style={ main.backgroundImage }>
          { this.setCategoryIcon() }
        </View>
        { renderMainTop() }
        { renderMainMiddle() }
        { renderMainBottom() }
      </View>
    );
  }

  public render () {
    return (
      <View
        style={[ styling.container, { height: this.props.height || 300 } ]}>
        { this.renderMain() }
      </View>
    );
  }
}

const styling = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
});

const main = StyleSheet.create({
  backgroundImage: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    opacity: .1,
    position: 'absolute',
    width: '100%',
  },
  bottom: {
    flex: 1
  },
  metaText: {
    color: Styles.colors.primary.light,
    fontSize: Styles.textSizes.extraSmall,
    textAlign: 'center'
  },
  middle: {
    flex: 1
  },
  muscleGroupsRow: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  muscleGroup: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column'
  },
  muscleGroupText: {
    color: Styles.colors.primary.main,
    textAlign: 'center'
  },
  nameView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingTop: 20
  },
  nameText: {
    color: Styles.colors.secondary.main,
    fontSize: Styles.textSizes.large
  },
  view: {
    backgroundColor: 'white',
    flex: 5
  },
  text: {
    color: 'black'
  },
  top: {
    flex: 1
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  weightAndRepRow: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10
  },
  weightView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 4,
    justifyContent: 'center',
  }
});