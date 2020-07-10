import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getStyles } from './stylesheet.js';
import { connect } from 'react-redux';
import { windowSelector } from '../redux/selectors.js';
import { usernameAvailable } from '../modules/users.js';


const validationSchema = Yup.object().shape({
  username: Yup.string()
    .label('Username')
    .required('Please choose a username.'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email.'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have more than 4 characters.'),
  password_copy: Yup.string()
    .label('Confirm Password')
    .required(),
});

function _CreateAccountForm({
  submitCreateAccount,
  window_dimensions,
}) {
  const styles = getStyles(window_dimensions);

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        password_copy: '',
      }}
      validationSchema={validationSchema}
      onSubmit={submitCreateAccount}
    >
      {({ 
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
        isSubmitting,
        handleBlur,
      }) => (
        <View style={styles.loginForm}>
          <Field
            component={ Input }
            placeholder="   Username"
            leftIcon={{type: 'fontisto', name: 'person'}}
            onChangeText={handleChange('username')}
            value={values.username}
            onBlur={handleBlur("username")}
            style={styles.loginInputField}
          />
          <ErrorMessage name="username"
            render={(errorMessage) => (
              <Text style={styles.loginTextError}> {errorMessage} </Text>
            )}
          />
          <Field
            component={Input}
            placeholder="   Email"
            leftIcon={{ type: 'fontisto', name: 'email' }}
            onChangeText={handleChange('email')}
            value={values.email}
            onBlur={handleBlur("email")}
            style={styles.loginInputField}
          />
          <ErrorMessage name="email"
            render={(errorMessage) => (
              <Text style={styles.loginTextError}> {errorMessage} </Text>
            )}
          />
          <Field
            component={Input}
            placeholder="   Password"
            leftIcon={{ type: 'fontisto', name: 'locked' }}
            onChangeText={handleChange('password')}
            value={values.password}
            onBlur={handleBlur("password")}
            secureTextEntry={true}
          />
          <ErrorMessage name="password"
            render={(errorMessage) => (
              <Text style={styles.loginTextError}> {errorMessage} </Text>
            )}
          />
          <Field
            component={Input}
            placeholder="   Confirm Password"
            leftIcon={{ type: 'fontisto', name: 'locked' }}
            onChangeText={handleChange('password_copy')}
            value={values.password_copy}
            onBlur={handleBlur("password_copy")}
            secureTextEntry={true}
          />
          <ErrorMessage name="password_copy"
            render={(errorMessage) => (
              <Text style={styles.loginTextError}> {errorMessage} </Text>
            )}
          />
          <Button
            onPress={handleSubmit}
            title="Create Account" 
            disabled={!isValid || isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
}
_CreateAccountForm.propTypes = {
  submitCreateAccount: PropTypes.func.isRequired,
  window_dimensions: PropTypes.object.isRequired,
};
export const CreateAccountForm = connect(
  state => ({ 
    window_dimensions: windowSelector(state),
  }),
)(_CreateAccountForm);
