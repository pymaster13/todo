import auth from "./auth";
import todo from "./todo";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth,
  todo,
});

export default rootReducer;
