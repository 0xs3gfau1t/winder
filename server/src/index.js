const path = require("path")

// Import all environment variables from .env
// Requires dotenv module
require("dotenv").config({ path: path.resolve(__dirname, "../.env") })

const app = require("./Config/app")
const server = require("http").createServer(app)

// IO connection
const { onConnectionHandler } = require("./Controllers/socket")
const io = require("socket.io")(server, { cors: { origin: "*" } })
io.on("connection", onConnectionHandler)

// Connect to the database
require("./Config/db")()

const authenticateToken = require("./Middlewares/authenticateToken")

// Routing each endpoint to respective routers
app.use("/auth", require("./Routes/Auth.js"))
app.use("/messages", authenticateToken, require("./Routes/Messages.js"))
app.use("/notification", require("./Routes/Notifications.js"))
app.use("/settings", require("./Routes/Settings.js"))
app.use("/explore", require("./Routes/Explore.js"))
app.use("/changepassword", require("./Routes/ChangePassword.js"))

// Start the server specied in PORT from .env
server.listen(process.env.PORT || 4000, () => {
	console.log("Lisening in port " + (process.env.PORT || 4000))
})
