import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { currentUserSelector, windowSelector } from '../redux/selectors.js';
import { getStyles } from './stylesheet.js';

function _MainView({ userLoggedIn, current_user, window_dimensions }) {
  const styles = getStyles(window_dimensions);
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
    current_user: currentUserSelector(state).currentUser,
    userLoggedIn: currentUserSelector(state).userLoggedIn,
    window_dimensions: windowSelector(state),
  }),
)(_MainView);

