const express = require("express")

const app = express()

// Configure middleware
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)
app.use(require('cookie-parser')())

module.exports = app
