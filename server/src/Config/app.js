const express = require("express")

const app = express()

// Configure middleware
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)

module.exports = app
