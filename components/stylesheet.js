import React from 'react';
import { StyleSheet } from 'react-native';

export function getStyles({width, height}){
  return StyleSheet.create({
    loginPromptBG: {
      position: "absolute",  
      width: "100%",
      height: "100%",  
      backgroundColor: "rgba(0,0,0, 0.5)",  
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginPromptWindow: {
      backgroundColor: "#ffffff",
      borderRadius: 30,
      padding:20,
      margin: "auto",  
      alignItems: 'center',
    },
    loginForm: {
      width: width*0.8,
      maxWidth: 400,
    },
    loginHeaderTextView: {
      maxWidth: 400,
      width: width*0.8,
    },
    loginSubTextView: {
      paddingTop: 10,
      maxWidth: 350,
      width: width*0.8,
    },
    loginInputField: {
      height:40,
    },
    loginInputFieldError: {
    },
    textCentered: {
    },
    loginTextHeading: {
      maxWidth: 400,
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
    },
    loginTextSub: {
      fontSize: 14,
      color: "#888",
      textAlign: "center",
    },
    loginTextError: {
      color: "#ff0000"
    },
    textClickable: {
      textDecorationLine: 'underline',
    },
    loginButtonRow: {
      flex: 1,
      flexDirection: 'row',
    },
    mapview: {...StyleSheet.absoluteFillObject },
    map: {},
    mapcontainer: {
      position: "absolute",  
      width: "100%",
      height: "100%",  
      backgroundColor: "rgba(0,0,0, 0.5)",  
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      /*
      width: width,
      height: height,
      */
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      position: 'absolute'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
