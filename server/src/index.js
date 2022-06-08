const path = require("path")

// Import all environment variables from .env
// Requires dotenv module
require("dotenv").config({ path: path.resolve(__dirname, "../.env") })

const app = require("./Config/app")
const server = require("http").createServer(app)
const io = require("socket.io")(server, { cors: { origin: "*" } })

// Routing each endpoint to respective routers
app.use("/auth", require("./Routes/Auth.js"))
app.use("/messages", require("./Routes/Messages.js"))
app.use("/notification", require("./Routes/Notifications.js"))
app.use("/settings", require("./Routes/Settings.js"))
app.use("/explore", require("./Routes/Explore.js"))
app.use("/profile", require("./Routes/Profile.js"))



// IO connection
io.on("connection", socket => {
	console.log(`User connected with socket id: ${socket.id}`)

	socket.on("disconnect", payload => {
		console.log(`User with socket id: ${socket.id} disconnected`)
	})
})

// Start the server specied in PORT from .env
server.listen(process.env.PORT || 4000, () => {
	console.log("Lisening in port " + (process.env.PORT || 4000))
})