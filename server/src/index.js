const path = require("path")

// Import all environment variables from .env
// Requires dotenv module
require("dotenv").config({ path: path.resolve(__dirname, "../.env") })

const { app, server } = require("./Config/app")

// Connect to the database
require("./Config/db")()

const authenticateToken = require("./Middlewares/authenticateToken")
const checkEmailVerification = require("./Middlewares/verifyEmail")

//Test endpoint for dev purpose
app.get("/", (req, res) => {
	res.json({ "message": "Welcome!" })
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
app.use("/changepassword", require("./Routes/ChangePassword.js"))

// Start the server specied in PORT from .env
server.listen(process.env.PORT || 4000, () => {
	console.log("Lisening in port " + (process.env.PORT || 4000))
})
