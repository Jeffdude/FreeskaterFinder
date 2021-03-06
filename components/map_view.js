import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {
  currentUserSelector,
  windowSelector,
  navigationSelector
} from '../redux/selectors.js';
import { StyleSheet} from 'react-native'
import styles from './stylesheet.js';
import MapView from 'react-native-maps';

function _FFMapView({ userLoggedIn, current_user }) {
  if(!userLoggedIn){
    return (<></>);
  }
  return (
    <View style={styles.mapcontainer}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.mapStyle}
      />
    </View>
  );
}
_FFMapView.propTypes = {
  userLoggedIn: PropTypes.bool,
  current_user: PropTypes.object,
}

export const FFMapView = connect(
  state => ({
    current_user: currentUserSelector(state).currentUser,
    userLoggedIn: currentUserSelector(state).userLoggedIn,
  }),
  null,
)(_FFMapView);

