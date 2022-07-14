const path = require("path")
const Dotenv = require("dotenv-webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: path.join(__dirname, "/static"),
		filename: "main.js",
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "/src"),
		},
		compress: true,
		port: 8000,
		historyApiFallback: true,
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
	plugins: [new Dotenv(), new HtmlWebpackPlugin({
		title: "Winder",
		template: path.join("src", "index.html"),
		script: "main.js",
		inject: false
	})],
}
