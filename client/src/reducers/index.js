import { combineReducers } from "redux"
import auth from "./auth"
import exploreReducer from "./exploreReducer"
import misc from "./misc"

export default combineReducers({
	auth,
	misc,
	explore: exploreReducer,
})
