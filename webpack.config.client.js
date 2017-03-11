var webpack = require('webpack');
var path = require('path');

var config = {
  entry: './src/client.jsx',
  output: {
    path:  path.join(__dirname, 'public', 'static'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module : {
    loaders : [
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
  plugins: [
    // new UglifyJSPlugin()
  ]
};

process.traceDeprecation = false

module.exports = config;
