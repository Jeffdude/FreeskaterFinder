import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { currentUserSelector, windowSelector } from '../redux/selectors.js';
import { getStyles } from './stylesheet.js';
import MapView from 'react-native-maps';

function _FFMapView({ userLoggedIn, current_user, window_dimensions }) {
  const styles = getStyles(window_dimensions);
  if(!userLoggedIn){
    return (<></>);
  }
  return (
    <View styles={styles.mapview}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        styles={styles.map}
      />
    </View>
  );
}
_FFMapView.propTypes = {
  userLoggedIn: PropTypes.bool,
  current_user: PropTypes.object,
  window_dimensions: PropTypes.object,
}

export const FFMapView = connect(
  state => ({
    current_user: currentUserSelector(state).currentUser,
    userLoggedIn: currentUserSelector(state).userLoggedIn,
    window_dimensions: windowSelector(state),
  }),
)(_FFMapView);

