const express = require("express")
const cors = require('cors')
const app = express()

// Configure middleware
app.use(cors()) //enable cors for dev purpose only
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)
app.use(require('cookie-parser')())

module.exports = app
