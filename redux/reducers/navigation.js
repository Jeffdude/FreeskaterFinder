import { SELECT_NAVIGATION_TAB } from "../actionTypes.js";
import { NAVIGATION_TABS } from "../../constants.js";

const initialState = {
  activeTab: NAVIGATION_TABS.MAP_TAB,
}

export default function(state = initialState, action){
  switch(action.type) {
    case SELECT_NAVIGATION_TAB:
      const { navigation_tab } = action.payload;
      return {
        ...state,
        activeTab: navigation_tab,
      }
    default:
      return state;
  }
}
