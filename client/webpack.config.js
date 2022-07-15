const path = require("path")
const webpack = require("webpack")
const Dotenv = require("dotenv-webpack")
require("dotenv").config({ path: path.resolve(__dirname, "./.env") })

const host = process.env.HOST || "localhost"
const port = process.env.PORT || "8000"

module.exports = {
	output: {
		path: path.join(__dirname, "/static"),
		filename: "main.js",
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "/src"),
		},
		compress: true,
		host,
		port,
		historyApiFallback: true,
		proxy: {
			"/api": {
				target: process.env.BACKEND_URL,
				pathRewrite: { "^/api": "" },
			},
            "/windersock": {
                target: process.env.BACKEND_URL,
                ws: true,
            },
		},
	},
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /node-modules/,
				use: "babel-loader",
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(svg|png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
		],
	},
	plugins: [new Dotenv()],
}
