import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Styles } from '../styling/styles.styling';

// TODO: For now, typing is not working on this import. Ignore redlining on this import.
import * as auth from '../constants/authentication.helpers';
import { CustomTextInput } from '../components/customTextInput';
import * as enums from '../constants/enums';

interface Props {
  navigation: any;
}

interface State {

  // state for text inputs
  email: string;
  password: string;

  // state for error modal
  modalIsVisible: boolean;
  modalHeaderText: string;
  modalMessage: string;
}

export class LoginScreen extends Component<Props, State> {

  constructor (props) {
    super(props);
    this.state = {
      confirm: '',
      email: '',
      password: '',
      modalIsVisible: false,
      modalHeaderText: '',
      modalMessage: ''
    };
  }

  private doWhenFieldsAreEmpty = () => {
    const message = 'Please provide information for each field.';
    this.setState({ modalIsVisible: true });
    this.setState({ 'modalHeaderText': 'Registration Error' });
    this.setState({ 'modalMessage': message });
  }

  private serverError = error => {
    const message = error.message;
    this.setState({ modalIsVisible: true });
    this.setState({ 'modalHeaderText': 'Registration Error' });
    this.setState({ 'modalMessage': message });
  }

  public login = () => {

    // require all three parameters
    if (!this.state.email || !this.state.password) {
      this.doWhenFieldsAreEmpty();
      return false;
    }

    // password must match password confirmation
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(result => {
        // navigate if successful
        const { navigate } = this.props.navigation;
        navigate ('landing');
      })
      .catch(error => {
        this.serverError(error);
      });
  }

  public closeModal = (): void => {
    this.setState({ modalIsVisible: false });
  }

  public render () {
    const stylingForPasswordInput = {
      paddingTop: 20,
      paddingBottom: 20,
    };

    return (
      <View style={ styling.container }>
        <View
          style={ styling.headingView }>
          <Text
            style={ styling.headingText }>
            Login
          </Text>
          <Text
            style={ styling.text }>
            Log into your account with Up-Lift.
          </Text>
        </View>
        <View
          style={ styling.inputsView }>
          <CustomTextInput
            autoCapitalize={ enums.AutoCapitalize.none }
            autoFocus={ true }
            keyboardType={ enums.KeyboardType['email-address'] }
            label='Email'
            onChangeText={ text => this.setState({ 'email': text }) }
            selectTextOnFocus={ true }
          />
          <CustomTextInput
            autoCapitalize={ enums.AutoCapitalize.none }
            label='Password'
            onChangeText={ text => this.setState({ 'password': text }) }
            secureTextEntry={ true }
            selectTextOnFocus={ true }
            wrapperStyle={ stylingForPasswordInput }
          />
        </View>
        <View
          style={ styling.signUpButtonView }>
          <Button
            color={ Styles.colors.secondary.main }
            onPress={ this.login }
            title='Login' />
        </View>
        <Modal
          animationType={ enums.ModalAnimationType.slide }
          transparent={ true }
          visible={ this.state.modalIsVisible }>
          <View
            style={ styling.modalContainer }>
            <View
              style={ styling.modalContent }>
              <View
                style={ styling.modalHeader }>
                <Text
                  style={ styling.modalHeaderText }>
                  { this.state.modalHeaderText }
                </Text>
              </View>
              <View
                style={ styling.modalBody }>
                <Text
                  style={ styling.modalBodyText }>
                  { this.state.modalMessage }
                </Text>
              </View>
              <TouchableOpacity
                style={ styling.modalFooter }
                onPress={ this.closeModal }>
                <View>
                  <Text
                    style={ styling.modalFooterText }>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    paddingTop: 20,
    paddingBottom: 20
  },
  headingView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    color: 'white',
    flex: 2,
    fontSize: Styles.textSizes.extraLarge,
  },
  text: {
    color: Styles.colors.primary.light,
    flex: 1,
    fontSize: Styles.textSizes.normal,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10
  },
  inputsView: {
    justifyContent: 'center',
    flex: 4
  },
  textInputWithoutFocus: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: 300
  },
  textInputWithFocus: {
    borderColor: Styles.colors.secondary.main,
    borderWidth: 1,
    color: 'white',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: 300,
  },
  signUpButtonView: {
    flex: 1,
    justifyContent: 'center'
  },
  modalContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.75)',
    flex: 8,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    flexDirection: 'column',
    height: 300,
    justifyContent: 'space-between',
    width: 250,
    shadowColor: Styles.shadows.iosBoxShadow.shadowColor,
    shadowOffset: Styles.shadows.iosBoxShadow.shadowOffset,
    shadowOpacity: Styles.shadows.iosBoxShadow.shadowOpacity,
    shadowRadius: Styles.shadows.iosBoxShadow.shadowRadius,
  },
  modalHeader: {
    flex: 1,
    padding: 10
  },
  modalHeaderText: {
    fontSize: Styles.textSizes.normal,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalBody: {
    flex: 6,
    padding: 10
  },
  modalBodyText: {
    fontSize: Styles.textSizes.extraSmall
  },
  modalFooter: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
  },
  modalFooterText: {
    color: 'white',
    fontSize: Styles.textSizes.small
  }

});