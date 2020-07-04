import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';
import { getUser, createUser, signInUser, userLoggedIn } from '../modules/users.js';
import { Input } from 'react-native-elements';
import { getStyles } from './stylesheet.js';
import { connect } from 'react-redux';
import { setComponentState } from '../redux/actions.js';
import { GenGenericInput } from '../modules/components.js';
import { 
  componentSelector,
  userSelector,
  windowSelector,
} from '../redux/selectors.js';

function _CreateAccountForm({
  userIsCreatingAccount,
  window_dimensions,
}) {
  const styles = getStyles(window_dimensions);
  const UsernameInput = GenGenericInput("login.username")

  return (
    <View>
      <UsernameInput
        placeholder="   Username"
        leftIcon={{ type: 'fontisto', name: 'person' }}
      />
    {/*
      <Input
        placeholder="   Email"
        leftIcon={{ type: 'fontisto', name: 'email' }}
        onChangeText={changeText("email", email_state)}
        value={email_state.text}
        ref={email_state.ref}
      />
      <Input
        placeholder="   Password"
        leftIcon={{ type: 'fontisto', name: 'locked' }}
        onChangeText={changeText("password", pw_state)}
        value={pw_state.text}
        ref={pw_state.ref}
        secureTextEntry={true}
      />
      { userIsCreatingAccount ? 
        <Input
          placeholder="   Confirm Password"
          leftIcon={{ type: 'fontisto', name: 'locked' }}
          onChangeText={(text) => setComponentState("login", "password_copy", text)}
          value={pw_copy_value}
          secureTextEntry={true}
          ref={password_copy_ref}
        />
        : null
      }
      */}
    </View>
  );
}
_CreateAccountForm.propTypes = {
  userIsCreatingAccount: PropTypes.bool.isRequired,
  window_dimensions: PropTypes.object.isRequired,
};

const CreateAccountForm = connect(
  state => ({ 
    userIsCreatingAccount: componentSelector(state).login.userIsCreatingAccount,
    window_dimensions: windowSelector(state),
  }),
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
  username,
  /*
  email,
  password,
  password_copy,
  */
  userLoggedIn,
  window_dimensions,
}){
  const styles = getStyles(window_dimensions);

  function _doCreateAccount() {
    console.log("Create Account: Email: ", email, " Password: ", password);
    if (password != password_copy) {
      console.error("PASSWORDS DO NOT MATCH", password, password_copy);
      return;
    }
    const {success, message} = createUser(email, password, username.text)
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
    <View style={styles.loginPromptBG}>
      <View style={styles.loginPrompt}>
        <Text style={styles.textCentered}>
          <Text style={styles.textHeading}>
            {userIsCreatingAccount
              ? "Create An Account"
              : "Log In"
            }{"\n"}To Find Freeskaters Near You
           </Text>
          {"\n"}
          <Text style={styles.textSub}>
            This app uses secure Firebase authorization,{"\n"}and we will never share your information elsewhere.
          </Text>
          {"\n".repeat(2)}
        </Text>
        <CreateAccountForm/>
        { userIsCreatingAccount
          ? <CreateAccountButton doCreateAccount={ _doCreateAccount } styles={styles}/>
          : <LoginButton doSignInUser={ _doSignInUser } styles={styles}/>
        }
        <SignInOrCreateAccountToggle styles={styles}/>
      </View>
    </View>
  );
}
_LoginPrompt.propTypes = {
  userIsCreatingAccount: PropTypes.bool.isRequired,
  username: PropTypes.object,
  /*
  email: PropTypes.string,
  password: PropTypes.string,
  password_copy: PropTypes.string,
  */
  userLoggedIn: PropTypes.bool,
  window_dimensions: PropTypes.object,
}


export const LoginPrompt = connect(
  state => ({ 
    userIsCreatingAccount: componentSelector(state).login.userIsCreatingAccount,
    username: componentSelector(state).login.username,
    /*email: componentSelector(state).login.email,
    password: componentSelector(state).login.password,
    password_copy: componentSelector(state).login.password_copy,
    */
    userLoggedIn: userSelector(state).userLoggedIn,
    window_dimensions: windowSelector(state),
  }),
  null
)(_LoginPrompt);
