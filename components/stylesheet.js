import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textBase: {
    textAlign: "center",
  },
  textHeading: {
    fontSize: 22,
    fontWeight: "bold",
  },
  textSub: {
    fontSize: 14,
    color: "#888",
  },
  loginPrompt: {
    flex: 3,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 500,
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

export default styles;
