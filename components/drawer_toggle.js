import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import styles from './stylesheet.js';

export function FFDrawerToggle({navigation}){
  return (
    <Icon
     reverse
     type='ionicons'
     name='menu'
     containerStyle={styles.drawerToggle}
     onPress={navigation.toggleDrawer}
    />
  );
}
