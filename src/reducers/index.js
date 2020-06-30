import { combineReducers } from "redux";
import errorReducer from "./errorReducer";

/** errorReducer is the method we created */
export default combineReducers({
  errors: errorReducer,
});
