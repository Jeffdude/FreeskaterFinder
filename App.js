import React from 'react';
import { registerRootComponent } from 'expo';
import { View, Dimensions, YellowBox  } from 'react-native';
import Constants from 'expo-constants';
import { initUserListener } from './modules/users.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { setWindowDimensions } from './redux/actions.js';
import { windowSelector } from './redux/selectors.js';
import { LoginPrompt } from './components/login.js';
import { FFMapView } from './components/map_view.js';
import { FFSettings } from './components/settings.js';
import { firebase } from './modules/firebase.js';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

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
    YellowBox.ignoreWarnings([
      'Setting a timer'
    ]);
    console.log("Manifest:", JSON.stringify(Constants.manifest));
    //firebase.auth().signOut();
    initUserListener(store);
    store.dispatch(
      setWindowDimensions(
        Dimensions.get('window').width,
        Dimensions.get('window').height,
      )
    );
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      if( 
        windowSelector(store.getState()).window_dimensions == {
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }
      ){
        return;
      } else {
        store.dispatch(
          setWindowDimensions(
            Dimensions.get('window').width,
            Dimensions.get('window').height,
          )
        );
      }
    });
  }


  render() {
    const Drawer = createDrawerNavigator();
    return (
      <Provider store={store}> 
        <LoginPrompt/>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Settings">
            <Drawer.Screen name="Map" component={FFMapView}/>
            <Drawer.Screen name="Settings" component={FFSettings}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider> 
    );
  }
}

registerRootComponent(App);
