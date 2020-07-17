import { 
  ADD_TEST_LIST,
  CLEAR_TEST_LIST,
  SELECT_NAVIGATION_TAB,
  SYNC_TEST_LIST,
  SET_COMPONENT_STATE,
  CREATE_USER,
  LOAD_USER,
  CLEAR_USER,
  SET_WINDOW_DIMENSIONS,
} from "./actionTypes.js";

export const selectNavigationTab = navigation_tab => ({
  type: SELECT_NAVIGATION_TAB,
  payload: { navigation_tab },
});

export const setComponentState = (category_name, component_name, component_state) => ({
  type: SET_COMPONENT_STATE,
  payload: {
    category_name: category_name,
    component_name: component_name,
    component_state: component_state,
  },
});

export const loadUser = (username, email, uid) => ({
  type: LOAD_USER,
  payload: {username: username, email: email, uid: uid}
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const setWindowDimensions = (width, height) => ({
  type: SET_WINDOW_DIMENSIONS,
  payload: {width: width, height: height},
});


/* 
 * Testing and debug stuff
 */
export const addTestList = text => ({
  type: ADD_TEST_LIST,
  payload: { text },
});

export const clearTestList = () => ({
  type: CLEAR_TEST_LIST,
});

export const syncTestList = (test_list) => ({
  type: SYNC_TEST_LIST,
  payload: test_list,
});
