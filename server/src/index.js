const path = require("path")
const express = require("express")
fs = require("fs")

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

// Endpoint for production
// Serves production level compiled static file
app.get("/", (req, res) => {
	if (process.env.NODE_ENV === "production") {
		const static_path = path.resolve(__dirname, "../../client/static")
		const entry_file = path.join(static_path, "index.html")
		app.use(express.static(static_path))
		return fs.existsSync(entry_file)
			? res.sendFile(entry_file)
			: res.json({ message: "Hemlo, built files are not under water. Please help me. Uuuuughhh.." })
	} else {
		return res.json({ message: "Hemlo, I'm under the dev-water." })
	}
})

// Routing each endpoint to respective routers
app.use("/auth", require("./Routes/Auth.js"))
app.use(
	"/messages",
	authenticateToken,
	checkEmailVerification,
	require("./Routes/Messages.js")
)
app.use(
	"/notification",
	authenticateToken,
	checkEmailVerification,
	require("./Routes/Notifications.js")
)
app.use("/settings", require("./Routes/Settings.js"))
app.use(
	"/explore",
	authenticateToken,
	checkEmailVerification,
	require("./Routes/Explore.js")
)
app.use("/forgotpassword", require("./Routes/ForgotPassword.js"))
app.use("/image", require("./Routes/Image.js"))

// Start the server specied in PORT from .env
server.listen(process.env.PORT || 4000, () => {
	console.log("Lisening in port " + (process.env.PORT || 4000))
})
