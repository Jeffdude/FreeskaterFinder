import { ADD_TEST_LIST, CLEAR_TEST_LIST } from "../actionTypes.js";


const initialState = { test_list: [] }

export default function(state = initialState, action){
  switch(action.type) {
    case ADD_TEST_LIST:
      const { text } = action.payload;
      return {
        ...state,
        test_list: [...state.test_list, text],
      }

    case CLEAR_TEST_LIST:
      return {test_list: []}

    default:
      return state;
  }
}
