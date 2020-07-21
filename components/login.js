import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, TouchableWithoutFeedback, Text, View } from 'react-native';
import { createUser, signInUser } from '../modules/users.js';
import styles from './stylesheet.js';
import { connect } from 'react-redux';
import { setComponentState } from '../redux/actions.js';
import { 
  componentSelector,
  currentUserSelector,
  windowSelector,
  navigationSelector,
} from '../redux/selectors.js';
import { CreateAccountForm } from './create_account_form.js';
import { LoginAccountForm } from './login_form.js';
import * as helpers from '../modules/helpers.js';


function _SignInOrCreateAccountToggle({ userIsCreatingAccount, setComponentState, styles}){
  return (
    <Text
      onPress={ () => setComponentState(
        "login", "userIsCreatingAccount", !userIsCreatingAccount
      )}
      style={styles.textClickable}
    >
      {userIsCreatingAccount ? "Already have an account?" : "Don't yet have an account?"}
    </Text>
  );
}
_SignInOrCreateAccountToggle.propTypes = {
  userIsCreatingAccount: PropTypes.bool,
  setComponentState: PropTypes.func,
  styles: PropTypes.object,
}
const SignInOrCreateAccountToggle = connect(
  state => ({ 
    userIsCreatingAccount: componentSelector(state).login.userIsCreatingAccount,
  }),
  { setComponentState },
)(_SignInOrCreateAccountToggle);

function _LoginPrompt({ 
  userIsCreatingAccount,
  userLoggedIn,
}){
  if(userLoggedIn){
    return (<></>);
  }

  function submitCreateAccount(
    { username, email, password, password_copy },
    { setSubmitting },
  ) {
    console.log(
      "Creating Account with email:", email,
      "Password:", password.replace(/./g, '*')
    );
    if (password !== password_copy) {
      console.log("PASSWORDS DO NOT MATCH", password, password_copy);
      helpers.createAlert("Passwords do not match.");
      setSubmitting(false);
      return;
    }
    const {success, message} = createUser(email, password, username)
    if (success) {
      console.log("User successfully created!")
    } else {
      console.error("[Create User] Wah wah :(", message)
    }
    setSubmitting(false);
    return;
  }

  function submitLogin({ email, password }, { setSubmitting }) {
    console.log("Signing user in with email: ", email);
    const {success, message} = signInUser(email, password)
    if (success) {
      console.log("[Sign In User] User successfully logged in");
    } else {
      console.log("[Sign In User] Wah wah :(", message)
    }
    setSubmitting(false);
    return;
  }

  function headerText() {
    return (
      <View style={styles.loginHeaderTextView}>
        <Text style={styles.loginTextHeading}>
          {userIsCreatingAccount
            ? "Create An Account"
            : "Log In"
          } To Find Freeskaters Near You!
        </Text>
      </View>
    );
  }

  function subText() {
    return (
      <View style={styles.loginSubTextView}>
        <Text style={styles.loginTextSub}>
          This app uses secure Firebase authorization,
          and we will never share your information elsewhere.
        {"\n".repeat(2)}
        </Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.loginPromptBG}>
        <View style={styles.loginPromptWindow}>
          {headerText()}
          {subText()}
          {userIsCreatingAccount
            ? <CreateAccountForm submitCreateAccount={submitCreateAccount}/>
            : <LoginAccountForm submitLogin={submitLogin}/>
          }
          <SignInOrCreateAccountToggle styles={styles}/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
_LoginPrompt.propTypes = {
  userIsCreatingAccount: PropTypes.bool.isRequired,
  userLoggedIn: PropTypes.bool,
}

export const LoginPrompt = connect(
  state => ({ 
    userIsCreatingAccount: componentSelector(state).login.userIsCreatingAccount,
    userLoggedIn: currentUserSelector(state).userLoggedIn,
  }),
  null,
)(_LoginPrompt);
