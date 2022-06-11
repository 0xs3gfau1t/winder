import { combineReducers } from "redux";
import auth from './auth';
import misc from './misc'

export default combineReducers({
    auth,misc
});