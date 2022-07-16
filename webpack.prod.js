const { NONAME } = require("dns")
const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "./.env") })

const { merge } = require("webpack-merge")
const commonConfig = require("./webpack.common")

const prodConfig = {
	mode: "production",
}

module.exports = merge(commonConfig, prodConfig)
