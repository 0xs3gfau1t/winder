// Express App
const express = require("express")
const cors = require("cors")
const session = require("express-session")
const app = express()

app.use(function (req, res, next){
	console.log(`-> ${req.url}\n`)
	next()
})

// Configure middleware
app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true })) // Allow front end to access server's resources
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
if(process.env.NODE_ENV === "production")
	app.use(require("helmet")())

// HTTP SERVER
const server = require("http").createServer(app)

// SOCKET IO
const io = require("socket.io")(server, {
	cors: {
		origin: process.env.FRONTEND_URL,
		// AccessControlAllowCredentials: true,
		credentials: true,
	},
    path: "/windersock/",
})

module.exports = { app, io, server }
