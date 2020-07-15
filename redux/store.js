import { createStore } from "redux";
import rootReducer from "./reducers";
import devToolsEnhancer from 'remote-redux-devtools';

export default createStore(
  rootReducer, 
  devToolsEnhancer({suppressConnectErrors: false}),
);
