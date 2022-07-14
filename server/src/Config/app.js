// Express App
const express = require("express")
const cors = require("cors")
const session = require("express-session")
const app = express()

// Configure middleware
app.use(cors({ origin: [process.env.APP_URL], credentials: true })) //enable cors for dev purpose only
// https://stackoverflow.com/a/66553425/13001607
app.use(
	session({
		secret: process.env.SESSION_SECRET || "Secret",
		resave: true,
		saveUninitialized: false,
		cookie: {
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
			secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
		},
	})
)
app.use(express.json())
app.use(require("cookie-parser")())
app.use(
	express.urlencoded({
		extended: true,
	})
)

// Compression and helmet used here after following mdn web docs tutorial
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
app.use(require("compression")())
app.use(require("helmet")())

// HTTP SERVER
const server = require("http").createServer(app)

// SOCKET IO
const io = require("socket.io")(server, {
	cors: {
		origin: process.env.APP_URL,
		// AccessControlAllowCredentials: true,
		credentials: true,
	},
})

module.exports = { app, io, server }
