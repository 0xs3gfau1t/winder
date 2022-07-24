const path = require("path")
const Dotenv = require("dotenv-webpack")
require("dotenv").config({ path: path.resolve(__dirname, "./.env") })
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	output: {
		path: path.join(__dirname, "/static"),
		filename: "main.js",
		publicPath: "/",
	},
	entry: {
		main: "./client/index.js",
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
	plugins: [
		new Dotenv(),
		new HtmlWebpackPlugin({
			title: "Winder -- Find your soulmate",
			script: "/main.js",
			template: path.join(__dirname, "client", "index.html"),
			inject: false,
		}),
	],
}
