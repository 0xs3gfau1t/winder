import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { CookiesProvider } from "react-cookie"
import store from "./store"
import {
	Landing,
	Login,
	Error,
	Verify,
	Explore,
	Profile,
	Notification,
	Chat,
} from "./pages"
import PrivateRoute from "./components/privateRoute"
import Nav from "./components/Nav/Nav"
import "./app.css"

const App = () => {
	return (
		<CookiesProvider>
			<Provider store={store}>
				<Router>
					<Nav />
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/changepassword/:token"
							element={<Verify />}
						/>
						<Route path="*" element={<Error />} />
						<Route
							exact={true}
							path="/profile"
							element={
								<PrivateRoute>
									<Profile />
								</PrivateRoute>
							}
						/>
						<Route
							exact={true}
							path="/notification"
							element={
								<PrivateRoute>
									<Notification />
								</PrivateRoute>
							}
						/>
						<Route
							exact={true}
							path="/explore"
							element={
								<PrivateRoute>
									<Explore />
								</PrivateRoute>
							}
						/>
						<Route
							exact={true}
							path="/chat"
							element={
								<PrivateRoute>
									<Chat />
								</PrivateRoute>
							}
						/>
					</Routes>
				</Router>
			</Provider>
		</CookiesProvider>
		
	)
}

export default App
