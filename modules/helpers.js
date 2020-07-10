import React from 'react';
import { Alert } from 'react-native';
import * as Device from 'expo-device';

export function createAlert(alertMainText, alertSubText) {
  if(getDeviceType() === "web"){
    if(alertSubText){
      alert(alertMainText + "\n" + alertSubText);
    } else {
      alert(alertMainText);
    }
  }
  Alert.alert(
    alertMainText,
    alertSubText,
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );
}

export function getDeviceType() {
  switch(Device.brand){
    case "Google":
    case "xiami":
      return "android";
    case "Apple":
      return "ios";
    case null:
      return "web";
    default:
      console.log("Unhandled device brand:", Device.brand);
      return "android";
  }
}

