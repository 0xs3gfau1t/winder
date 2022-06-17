import { combineReducers } from "redux";
import auth from "./auth";
import misc from "./misc";
import user from "./user";

export default combineReducers({
  auth,
  misc,
  user,
});
