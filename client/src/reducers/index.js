import { combineReducers } from "redux"
import auth from "./auth"
import misc from "./misc"
import socket from "./socket"

export default combineReducers({
	auth,
	misc,
	socket,
})
