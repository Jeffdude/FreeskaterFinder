import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { windowSelector } from '../redux/selectors.js';
import { getStyles } from './stylesheet.js';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email.")
    .required("Please enter an email."),
  password: Yup.string()
    .label("Password")
    .required(),
});

function _LoginAccountForm({
  submitLogin,
  window_dimensions,
}){
  const styles = getStyles(window_dimensions);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={submitLogin}
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
          <Button
            onPress={handleSubmit}
            title="Log In"
            disabled={!isValid || isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
}
_LoginAccountForm.propTypes = {
  submitLogin: PropTypes.func.isRequired,
  window_dimensions: PropTypes.object.isRequired,
}
export const LoginAccountForm = connect(
  state => ({
    window_dimensions: windowSelector(state),
  }),
)(_LoginAccountForm);
