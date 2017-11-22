/**
 * The toast component creates a notification modal that appears at the bottom of the screen.
 * It is designed to mimic the Android toast notification system.
 *
 * required properties:
 * @requires subject: BehaviorSubject<boolean>
 *  - used to toggle the mount/unmount of the toast
 * @requires toastMessage: string
 *  - the message displayed on the toast
 *
 * optional properties:
 * @prop (optional) linkFunction: () => void
 *   @default this.closeToast()
 *     - the function attached to the linkText.
 * @prop (optional) linkText: string
 *   @default 'Close'
 *     - the text associated with the linkFunction.
 * @prop (optional) timeout: number
 *  - if provided, the toast will auto close based on the provided number. time is calculated by milliseconds.
 *
 * @example:
 *   // set up observable subject for toast passing to it an initial value of false
 *   public toastSubject = new BehaviorSubject<boolean>(false);
 *
 *   // initialize the subsription and start it in the componentDidMount() lifecycle method
 *   public toastListener;
 *
 *   componentDidMount () {
 *     // toggles the mount/unmount of <ToastComponent/>
 *     this.toastListener = this.toastSubject.subscribe(value => this.setState({ toastIsMounted: value }));
 *   }
 *
 *   // render the <ToastComponent/>
 *   public renderToast = () => {
 *     if (this.state.toastIsMounted) {
 *       return (
 *         <ToastComponent
 *           subject={ this.toastSubject }
 *           timeout={ 3000 }
 *           toastMessage='Exercise added to playlist' />
 *       );
 *     }
 *   }
 *
 * @class ToastComponent
 * @extends { Component <Props, State> }
 */

import React, { Component } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from '../styling/styles.styling';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/* Custom Component for Animated View */
interface FadeInProps {
  style: any;
  children: any;
}

interface FadeInState {}

class FadeInView extends Component <FadeInProps, FadeInState> {
  public state = {
    fadeAnim: new Animated.Value(0),
  };

  public componentDidMount () {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 300,
      }
    ).start();
  }

  public render () {
    let { fadeAnim } = this.state;

    return (
      <Animated.View
        style={[ this.props.style, { opacity: fadeAnim } ]}>
        { this.props.children }
      </Animated.View>
    );
  }
}

interface Props {
  subject: BehaviorSubject<boolean>;
  toastMessage: string;
  linkFunction?: () => void;
  linkText?: string;
  timeout?: number;
}

interface State {}
export class ToastComponent extends Component <Props, State> {

  constructor () {
    super ();
  }

  componentDidMount () {
    if (this.props.timeout) {
      this.timer = setTimeout(this.timeout, this.props.timeout);
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  public timer: number;

  public timeout = () => {
    if (this.props.timeout) {
      this.props.subject.next(false);
    }
  }

  public closeToast = () => {
    this.props.subject.next(false);
    clearInterval(this.timer);
  }

  public linkFunction = () => {
    if (this.props.linkFunction) {
      this.props.linkFunction();
    } else {
      this.closeToast();
    }
  }

  public renderToast () {
    return (
      <View
        style={ modal.container }>
        <Text
          style={{ color: 'white', fontSize: Styles.textSizes.small }}>
          { this.props.toastMessage }
        </Text>
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={ () => this.linkFunction() }>
          <Text>{ this.props.linkText || 'Close' }</Text>
        </TouchableOpacity>
      </View>
    );
  }

  public render () {
    return (
      <FadeInView
        style={{ flex: 1 }}>
        { this.renderToast() }
      </FadeInView>
    );
  }
}

const modal = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Styles.colors.secondary.main,
    bottom: 0,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    width: '100%',
  }
});