const path = require("path")
const { merge } = require("webpack-merge")
const commonConfig = require("./webpack.common")

const host = process.env.HOST || "localhost"
const port = process.env.CLIENT_PORT || "8000"

console.log(`Client Server\nHost: ${host}\nPort: ${port}\n`)

const devConfig = {
	mode: "development",
	watch: true,
	devServer: {
		static: {
			directory: path.join(__dirname, "/static"),
		},
		compress: true,
		host,
		port,
		historyApiFallback: true,
		proxy: {
			"/api": {
				target: `http://${process.env.HOST}:${process.env.PORT}`,
			},
			"/windersock": {
				target: `http://${process.env.HOST}:${process.env.PORT}`,
				ws: true,
			},
		},
	},
	devtool: "eval-source-map",
}

module.exports = merge(commonConfig, devConfig)
