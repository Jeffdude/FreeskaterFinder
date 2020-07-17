import { createStore } from "redux";
import rootReducer from "./reducers";
import devToolsEnhancer from "remote-redux-devtools";

export default createStore(
  rootReducer,
  devToolsEnhancer({
    hostname: "localhost",
    port: 8000,
    realtime: true
  })
);
