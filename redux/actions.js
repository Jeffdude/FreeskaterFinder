import { 
  ADD_TEST_LIST,
  CLEAR_TEST_LIST,
  SELECT_NAVIGATION_TAB,
  SYNC_TEST_LIST,
  SET_FORM_STATE,
  CREATE_USER,
  LOAD_USER,
  CLEAR_USER,
} from "./actionTypes.js";

export const selectNavigationTab = navigation_tab => ({
  type: SELECT_NAVIGATION_TAB,
  payload: { navigation_tab },
});

export const setFormState = (form_name, field_name, value) => ({
  type: SET_FORM_STATE,
  payload: { form_name: form_name, field_name: field_name, value: value },
});

export const loadUser = (username, email, uid) => ({
  type: LOAD_USER,
  payload: {username: username, email: email, uid: uid}
});

export const clearUser = () => ({
  type: CLEAR_USER,
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
