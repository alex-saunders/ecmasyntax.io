var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

var serverConfig = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: [
    './src/server.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'server.js'
  },
  module: {
    loaders: [
      {
        test : /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader : 'babel-loader',
            query: {
              presets: ['es2015', 'react', 'stage-0'],
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'isomorphic-style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.sass$/,
        loaders: ['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  }
};

process.traceDeprecation = false

module.exports = serverConfig;
