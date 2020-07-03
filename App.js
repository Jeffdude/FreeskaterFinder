import React from 'react';
import { registerRootComponent } from 'expo';
import { Text, View } from 'react-native';
import { initUserListener } from './modules/users.js';
import { firebase, linkTestList } from './modules/firebase.js';
import styles from './components/stylesheet.js';
import { selectNavigationTab } from './redux/actions.js';
import { NAVIGATION_TABS } from './constants.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { LoginPrompt } from './components/login.js';
import { TabSelector, TabDisplay } from './components/tabSelector.js';
import { TestListList, TestListInput } from './components/testList.js';
import { MainView } from './components/map_view.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //firebase.database.enableLogging(true);
    /*
    let test_list_db = firebase.database().ref('/testlist')
    test_list_db.set([{key: 0, value: 'test'}]);
    console.log("done writing");
    let result;
    test_list_db.once('value', doc => result = doc.val());
    console.log("Read:", result);


     * const unlink = linkTestList(firebase.database(), store);
    */
    firebase.auth().signOut();
    initUserListener(store);
  }

  componentDidMount() {}


  render() {
    return (
      <Provider store={store}> 
        <LoginPrompt/>
        <MainView/>
        <TabSelector/>
        <TabDisplay/>
        <TestListList/>
        <TestListInput/>
      </Provider> 
    );
  }
}

registerRootComponent(App);
