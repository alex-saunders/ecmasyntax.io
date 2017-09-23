const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CommonConfig = require('../common/webpack.client.common.js');

module.exports = Merge(CommonConfig, {
  devtool: 'inline-source-map',    
  // hash names
  output: {
    path: path.resolve(__dirname, '../', '../', 'dist', 'client', 'static', 'js'),
    publicPath: '/static/js/',
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new WebpackShellPlugin({onBuildEnd: ['webpack --progress --config webpack/prod/webpack.server.prod.js']}),        
  ]
});
