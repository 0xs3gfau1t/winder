const path = require('path')

module.exports = {
    output: {
        path: path.join(__dirname, ''),
        filename: 'main.js',
    },
    devServer: {
    static: {
      directory: path.join(__dirname, '/static'),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node-modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {

        test: /\.svg$/,

        use: [

          {

            loader: 'svg-url-loader',

            options: {

              limit: 10000,

            },
          },
        ],
      }
    ]
  }
}