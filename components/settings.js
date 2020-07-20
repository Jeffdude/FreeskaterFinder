import React from 'react';
import { View, Text } from 'react-native';
import { useIsDrawerOpen } from '@react-navigation/drawer';

export function FFSettings({navigation}){
  const isDrawerOpen = useIsDrawerOpen();
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
      <Text> Settings page. {isDrawerOpen ? "Open" : "Closed"} </Text>

    </View>
  );
}
