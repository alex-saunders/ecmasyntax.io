const webpack = require('webpack');
const Merge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CommonConfig = require('../common/webpack.server.common.js');

module.exports = Merge(CommonConfig, {
  devtool: 'inline-source-map',
  plugins: [
    new WebpackShellPlugin({onBuildEnd: ['nodemon dist/server/server.js --watch dist/server']}),
  ] 
});
