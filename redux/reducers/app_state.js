import {
  SELECT_NAVIGATION_TAB,
  SET_FORM_STATE,
  LOAD_USER,
  CLEAR_USER,
} from "../actionTypes.js";
import { NAVIGATION_TABS } from "../../constants.js";

const initialState = {
  navigation_state: {
    activeTab: NAVIGATION_TABS.MAP_TAB,
  },
  component_state: {
    login: {
      userIsCreatingAccount: true,
    },
  },
  current_user: {
    userLoggedIn: false,
    currentUser: {},
  }
}

/*
 * handles states under app_state.component_state
 */
function reduce_component_state(state, action){
  switch(action.type){
    case SET_FORM_STATE: {
      const { form_name, field_name, value } = action.payload;
      return {
        ...state,
        [form_name]: {
          ...state[form_name],
          [field_name]: value
        },
      };
    }
    default:
      return state;
  }
}


/*
 * handles states under app_state.navigation_state
 */
function reduce_navigation_state(state, action){
  switch(action.type) {
    case SELECT_NAVIGATION_TAB: {
      const { navigation_tab } = action.payload;
      return {
        ...state,
        activeTab: navigation_tab,
      }
    }
    default:
      return state;
  }
}

/*
 * handles states under app_state.current_user
 */
function reduce_current_user_state(state, action){
  switch(action.type) {
    case LOAD_USER: {
      return {
        ...state,
        currentUser: action.payload,
        userLoggedIn: true,
      }
    }
    case CLEAR_USER: {
      return {
        ...state,
        currentUser: {},
        userLoggedIn: false,
      }
    }
    default:
      return state;
  }
}

export default function(state = initialState, action){
  return {
    navigation_state: reduce_navigation_state(state.navigation_state, action),
    component_state: reduce_component_state(state.component_state, action),
    current_user: reduce_current_user_state(state.current_user, action),
  }
}
