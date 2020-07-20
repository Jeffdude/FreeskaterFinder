import React from 'react';
import { View, Text } from 'react-native';
import { useIsDrawerOpen } from '@react-navigation/drawer';

export function FFDrawerToggle({navigation}){
  return (
    <View style={}>
      <Text> Settings page. {isDrawerOpen ? "Open" : "Closed"} </Text>

    </View>
  );
}
