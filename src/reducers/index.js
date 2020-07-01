import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";

/** errorReducer is the method we created */
export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
});
