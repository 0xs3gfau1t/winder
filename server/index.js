const path = require("path")
const express = require("express")

// Import all environment variables from .env
// Requires dotenv module
require("dotenv").config({ path: path.resolve(__dirname, "../.env") })

const { app, io, server } = require("./Config/app")

// Connect to the database
require("./Config/db")()

// Io setup
const { onConnectionHandler } = require("./Controllers/socket")
io.on("connection", onConnectionHandler)

const authenticateToken = require("./Middlewares/authenticateToken")
const checkEmailVerification = require("./Middlewares/verifyEmail")

// Routing each endpoint to respective routers
app.use("/api/auth", require("./Routes/Auth.js"))
app.use(
	"/api/messages",
	authenticateToken,
	checkEmailVerification,
	require("./Routes/Messages.js")
)
app.use(
	"/api/notification",
	authenticateToken,
	checkEmailVerification,
	require("./Routes/Notifications.js")
)
app.use("/api/settings", require("./Routes/Settings.js"))
app.use(
	"/api/explore",
	authenticateToken,
	checkEmailVerification,
	require("./Routes/Explore.js")
)
app.use("/api/forgotpassword", require("./Routes/ForgotPassword.js"))
app.use("/api/image", require("./Routes/Image.js"))

// Setting static folder
app.use("/", express.static(path.resolve(__dirname + "../../static/")))

// Redirect everything other that /api/ to frontend
app.get("*", (req, res) =>
	res.sendFile(path.resolve(__dirname + "../../static/index.html"))
)

// Start the server specied in PORT from .env
let host = process.env.BACKEND_HOST || "localhost"
let port = process.env.BACKEND_PORT || 4000
server.listen({ host, port }, () => {
	console.log(`\nBackend Server\nHost: ${host}\nPort: ${port}\n`)
})
