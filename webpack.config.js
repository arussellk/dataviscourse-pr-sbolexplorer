// based on https://github.com/udp/sbolgraph_example

const path = require('path');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ],

    // Request (a dependency of sbolgraph) is a huge module and pulls in
    // all kinds of other dependencies. substitute it for browser-request.
    // TODO: change sbolgraph to use fetch
    alias: {
      request: 'browser-request',
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    publicPath: "/",
    contentBase: "./build"
  }
};

