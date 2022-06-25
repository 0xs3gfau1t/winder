import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "@redux-devtools/extension"
import thunk from "redux-thunk"
import listenSock, { wsMiddleware } from "./socketMid"
import rootReducer from "./reducers"

const initialState = {}

const middleware = [thunk, wsMiddleware]

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

listenSock(store)
export default store
