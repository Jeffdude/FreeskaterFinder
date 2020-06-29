import { ADD_TEST_LIST, CLEAR_TEST_LIST, SELECT_NAVIGATION_TAB } from "./actionTypes.js";

export const selectNavigationTab = navigation_tab => ({
  type: SELECT_NAVIGATION_TAB,
  payload: { navigation_tab },
});

export const addTestList = text => ({
  type: ADD_TEST_LIST,
  payload: { text },
});

export const clearTestList = () => ({
  type: CLEAR_TEST_LIST,
});
