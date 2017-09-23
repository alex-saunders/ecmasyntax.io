const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CommonConfig = require('../common/webpack.client.common.js');

module.exports = Merge(CommonConfig, {
  devtool: 'inline-source-map',    
    // no hash names
  output: {
    path: path.resolve(__dirname, '../', '../', 'dist', 'client', 'static', 'js'),
    publicPath: '/static/js/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [
    new WebpackShellPlugin({onBuildEnd: ['webpack --watch --config webpack/dev/webpack.server.dev.js']}),    
  ]
});
