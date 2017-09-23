const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('../common/webpack.server.common.js');

module.exports = Merge(CommonConfig, {
  devtool: 'inline-source-map',
  plugins: [
  ] 
});