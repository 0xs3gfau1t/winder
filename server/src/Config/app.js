// Express App
const express = require("express")
const cors = require('cors')
const app = express()
// Configure middleware
app.use(cors()) //enable cors for dev purpose only
app.use(express.json())
app.use(require("cookie-parser")())
app.use(
	express.urlencoded({
		extended: true,
	})
)

// HTTP SERVER
const server = require("http").createServer(app)

// SOCKET IO
const io = require("socket.io")(server, { cors: { origin: "*" } })
const { onConnectionHandler } = require("../Controllers/socket")
io.on("connection", onConnectionHandler)

module.exports = { app, io, server }
