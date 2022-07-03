import { combineReducers } from "redux"
import auth from "./auth"
import exploreReducer from "./exploreReducer"
import misc from "./misc"
import live from "./live"

export default combineReducers({
	auth,
	misc,
	explore: exploreReducer,
	live,
})
