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
    loginPrompt: {
      backgroundColor: "#ffffff",
      margin: "auto",  
      alignItems: 'center',
    },
    loginInput: {
    },
    loginInputError: {
    },
    textCentered: {
      textAlign: "center",
    },
    textHeading: {
      fontSize: 22,
      fontWeight: "bold",
    },
    textClickable: {
      textDecorationLine: 'underline',
    },
    textSub: {
      fontSize: 14,
      color: "#888",
    },
    loginButtonRow: {
      flex: 1,
      flexDirection: 'row',
    },
    mainview: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
