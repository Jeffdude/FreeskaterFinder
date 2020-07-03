import { combineReducers } from "redux";
import app_state from "./app_state.js";
import test_list from "./test_list.js";

export default combineReducers({ app_state, test_list });
