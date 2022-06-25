import { combineReducers } from "redux"
import auth from "./auth"
import exploreReducer from "./exploreReducer"
import misc from "./misc"

console.log(exploreReducer)

export default combineReducers({
	auth,
	misc,
	explore: exploreReducer,
})
