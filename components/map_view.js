import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { userStateSelector } from '../redux/selectors.js';
import styles from './stylesheet.js';

function _MainView({ userLoggedIn, current_user }) {
  if(!userLoggedIn){
    return null
  }
  return (
    <View style={styles.mainview}>
      <Text h1>Welcome {current_user.username}! </Text>
    </View>
  );
}
export const MainView = connect(
  state => ({
    current_user: userStateSelector(state).currentUser,
  }),
)(_MainView);
