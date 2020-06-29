import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';
import * as users from '../modules/users.js';
import { Input } from 'react-native-elements'
import styles from './stylesheet.js'

function CreateAccountForm(props) {
  return (
    <View style={styles.loginPrompt}>
      <Input
        placeholder="   Email"
        leftIcon={{ type: 'fontisto', name: 'email' }}
        onChangeText={props.emailInput}
      />
      <Input
        placeholder="   Password"
        leftIcon={{ type: 'fontisto', name: 'locked' }}
        onChangeText={props.passwordInput}
        secureTextEntry={true}
      />
    </View>
  );
}
CreateAccountForm.propTypes = {
  emailInput: PropTypes.func.isRequired,
  passwordInput: PropTypes.func.isRequired,
}


export class LoginPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: ""}
    this._setEmail = this._setEmail.bind(this);
    this._setPassword = this._setPassword.bind(this);
    this._doCreateAccount = this._doCreateAccount.bind(this);
  }

  _doCreateAccount() {
    if (users.createUser(this.state.email, this.state.password).success) {
      console.log("User " + users.getUser().displayName + " successfully created!")
    } else {
      console.error("[Create User] Wah wah :(")
    }
  }

  _doSignInUser() {
    if (users.signInUser(this.state.email, this.state.password).success) {
      console.log("User " + users.getUser().displayName + " successfully logged in!")
    } else {
      console.log("[Sign In User] Wah wah :(")
    }
  }

  _setEmail(value) {
    this.setState({email: value});
  }

  _setPassword(value){
    this.setState({password: value});
  }

  render() {
    return (
      <View style={styles.loginPrompt}>
        <Text style={styles.textBase}>
          <Text style={styles.textHeading}>Log In To Find Freeskaters Near You</Text>
          {"\n"}
          <Text style={styles.textSub}>
            This app uses secure Firebase authorization, and we will never share your information elsewhere.
          </Text>
          {"\n".repeat(2)}
        </Text>
        <CreateAccountForm emailInput={this._setEmail} passwordInput={this._setPassword}/>
        
      </View>
    );
  }
}
