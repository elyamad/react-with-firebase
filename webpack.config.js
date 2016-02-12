var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/app.js',
  output: { path: __dirname, filename: 'bundle.js' },
  plugins: [
      new webpack.PrefetchPlugin("react"),
      new webpack.PrefetchPlugin("react-bootstrap")
    ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
