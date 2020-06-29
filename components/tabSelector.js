import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { selectNavigationTab } from '../redux/actions.js';
import { NAVIGATION_TABS } from '../constants.js'

function _TabSelector({ selectNavigationTab }){
  return (
    <View style={{height: 50, width: 300, justifyContent: 'space-between', flexDirection: 'row'}}>
      <View style={{width: "30%"}}>
        <Button 
         title="Map"
         color="#ff0000"
         onPress={() => selectNavigationTab(NAVIGATION_TABS.MAP_TAB) }
        />
      </View>
      <View style={{width: "30%"}}>
        <Button
         title="Profile"
         color="#0000ff"
         onPress={() => selectNavigationTab(NAVIGATION_TABS.PROFILE_TAB) }
        />
      </View>
    </View>
  );
}
export const TabSelector = connect(
  null,
  { selectNavigationTab },
)(_TabSelector);

function _TabDisplay(props) {
  return (
    <View>
      <Text color="black"> Current tab: { props.navigation_tab.to_string } </Text>
    </View>
  );
}
export const TabDisplay = connect(
  state => ({ navigation_tab: state.navigation.activeTab }),
)(_TabDisplay);

