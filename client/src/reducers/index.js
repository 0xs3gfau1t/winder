import { combineReducers } from "redux"
import auth from "./auth"
import misc from "./misc"
import live from "./live"

export default combineReducers({
	auth,
	misc,
	live,
})
