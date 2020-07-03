import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';
import { getUser, createUser, signInUser, userLoggedIn } from '../modules/users.js';
import { Input } from 'react-native-elements'
import styles from './stylesheet.js'
import { connect } from 'react-redux';
import { setFormState } from '../redux/actions.js';
import { 
  componentStateSelector,
  userStateSelector,
} from '../redux/selectors.js';

function _CreateAccountForm({ email_value = "", pw_value = "", setFormState }) {
  return (
    <View style={styles.loginPrompt}>
      <Input
        placeholder="   Email"
        leftIcon={{ type: 'fontisto', name: 'email' }}
        onChangeText={(text) => setFormState("login", "email", text)}
        value={email_value}
      />
      <Input
        placeholder="   Password"
        leftIcon={{ type: 'fontisto', name: 'locked' }}
        onChangeText={(text) => setFormState("login", "password", text)}
        value={pw_value}
        secureTextEntry={true}
      />
    </View>
  );
}
_CreateAccountForm.propTypes = {
  email_value: PropTypes.string,
  pw_value: PropTypes.string,
  setFormState: PropTypes.func.isRequired,
};

const CreateAccountForm = connect(
  state => ({ 
    email_value: componentStateSelector(state).login.email,
    pw_value: componentStateSelector(state).login.password,
  }),
  { setFormState },
)(_CreateAccountForm);

function LoginButton({ doSignInUser }) {
  return (
    <Button
      onPress={doSignInUser}
      title="Log In"
      color="#00a0db"
    />
  );
}
LoginButton.propTypes = {
  doSignInUser: PropTypes.func.isRequired,
}

function CreateAccountButton({ doCreateAccount }) {
  return (
    <Button
      onPress={doCreateAccount}
      title="Create Account"
      color="#00a0db"
    />
  );
}
CreateAccountButton.propTypes = {
  doCreateAccount: PropTypes.func.isRequired,
}

function _SignInOrCreateAccountToggle({ userIsCreatingAccount, setFormState }){
  return (
    <Text
      onPress={ () => setFormState(
        "login", "userIsCreatingAccount", !userIsCreatingAccount
      )}
    >
      {userIsCreatingAccount ? "Already have an account?" : "Don't yet have an account?"}
    </Text>
  );
}
const SignInOrCreateAccountToggle = connect(
  state => ({ 
    userIsCreatingAccount: componentStateSelector(state).login.userIsCreatingAccount,
  }),
  { setFormState },
)(_SignInOrCreateAccountToggle);

function _LoginPrompt({ 
  userIsCreatingAccount,
  email,
  password,
  userLoggedIn,
}){
  function _doCreateAccount() {
    console.log("Create Account: Email: ", email, " Password: ", password);
    const {success, message} = createUser(email, password)
    if (success) {
      console.log("User successfully created!")
    } else {
      console.error("[Create User] Wah wah :(", message)
    }
  }

  function _doSignInUser() {
    console.log("Sign In: Email: ", email, " Password: ", password);
    const {success, message} = signInUser(email, password)
    if (success) {
      console.log("[Sign In User] User successfully logged in");
    } else {
      console.error("[Sign In User] Wah wah :(", message)
    }
  }

  if(userLoggedIn){
    return null;
  }

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
      <CreateAccountForm/>
      { userIsCreatingAccount
        ? <CreateAccountButton doCreateAccount={ _doCreateAccount }/>
        : <LoginButton doSignInUser={ _doSignInUser }/>
      }
      <SignInOrCreateAccountToggle/>
    </View>
  );
}

export const LoginPrompt = connect(
  state => ({ 
    userIsCreatingAccount: componentStateSelector(state).login.userIsCreatingAccount,
    email: componentStateSelector(state).login.email,
    password: componentStateSelector(state).login.password,
    userLoggedIn: userStateSelector(state).userLoggedIn,
  }),
  null
)(_LoginPrompt);
