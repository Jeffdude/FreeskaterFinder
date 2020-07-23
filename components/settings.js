import React from 'react';
import { Button, View, Text } from 'react-native';
import { StackActions } from '@react-navigation/native';

export function FFSettings({navigation}){
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
      <Text> Settings page. </Text>
      <Button 
        title="Go To Map"
        onPress={() => navigation.dispatch(StackActions.replace('Map'))}
      />
    </View>
  );
}
