import { ADD_TEST_LIST, CLEAR_TEST_LIST, SYNC_TEST_LIST } from "../actionTypes.js";


const initialState = { test_list: [] }
let nextKey = 0

export default function(state = initialState, action){
  switch(action.type) {
    case ADD_TEST_LIST:
      const { text } = action.payload;
      if (text === "") { return state; };
      return {
        ...state,
        test_list: [
          ...state.test_list,
          { key: nextKey++, value: text },
        ]
      }

    case CLEAR_TEST_LIST:
      return {test_list: []}

    case SYNC_TEST_LIST:
      const { test_list } = action.payload;
      console.log(test_list);
      let to_add = [];
      for (const elem of test_list){
        if (!state.test_list.includes(elem)){
          to_add = [...to_add, elem];
        }
        if (elem.key > nextKey){
          nextKey = elem.key + 1;
        }
      }
      return {
        ...state,
        test_list: [
          ...state.test_list,
          to_add,
        ]
      }
    default:
      return state;
  }
}
