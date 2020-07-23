import React from 'react';
import { registerRootComponent } from 'expo';
import { View, Dimensions, YellowBox  } from 'react-native';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { initUserListener } from './modules/users.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { setWindowDimensions } from './redux/actions.js';
import { windowSelector, currentUserSelector } from './redux/selectors.js';
import { FFLoginPrompt } from './components/login.js';
import { FFMapView } from './components/map_view.js';
import { FFSettings } from './components/settings.js';
import { FFDrawerToggle } from './components/drawer_toggle.js';
import { firebase } from './modules/firebase.js';

export default class FFApp extends React.Component {
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
    return (
      <Provider store={store}> 
        <AppAuthSwitcher/>
      </Provider> 
    );
  }
}

function _AppAuthSwitcher({ navigation, userLoggedIn }){
  const SettingStack = createStackNavigator();
  const AppDrawer = createDrawerNavigator();

  if (!userLoggedIn) {
    return <FFLoginPrompt/>;
  }

  const navigation_ref = React.useRef(null);

  return (
    <NavigationContainer ref={navigation_ref}>
      <Drawer.Screen name="Map" component={FFMapView}/>
      <Stack.Navigator>
        <Drawer.Screen name="Settings" component={FFSettings}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const AppAuthSwitcher = connect(
  state => ({
    userLoggedIn: currentUserSelector(state).userLoggedIn,
  }),
  null,
)(_AppAuthSwitcher);

registerRootComponent(FFApp);
