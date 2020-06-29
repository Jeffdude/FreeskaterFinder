import React from 'react';
import { registerRootComponent } from 'expo';
import { Text, View } from 'react-native';
import { LoginPrompt } from './frontend/login.js';
import * as users from './modules/users.js';
import styles from './frontend/stylesheet.js';
import { selectNavigationTab } from './redux/actions.js';
import { NAVIGATION_TABS } from './constants.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { TabSelector, TabDisplay } from './components/tabSelector.js';
import { TestListList, TestListInput } from './components/testList.js';

export default class App extends React.Component {
  componentDidMount() {
    const unsubscribe = store.subscribe(() => console.log(store.getState()))
  }

  render() {
    return (
      <Provider store={store}> 
        {/* users.userLoggedIn() ? <MainView/> : <LoginPrompt/> */}
        <TabSelector/>
        <TabDisplay/>
        <TestListList/>
        <TestListInput/>
      </Provider> 
    );
  }
}

function MainView(props) {
  return (
    <View style={styles.mainview}>
      <Text h1>Welcome {users.getUser().displayName}!</Text>
    </View>
  );
}

registerRootComponent(App);
