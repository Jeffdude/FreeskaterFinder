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
      { text: "OK", onPress: () => console.log("Alert dismissed.") }
    ],
    { cancelable: false }
  );
}

export function getDeviceType() {
  switch(Device.brand){
    case "google":
    case "xiami":
      return "android";
    case "apple":
      return "ios";
    case null:
      return "web";
    default:
      console.log("Unhandled device brand:", Device.brand);
      return "android";
  }
}

