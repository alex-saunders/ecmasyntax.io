const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CommonConfig = require('../common/webpack.client.common.js');

module.exports = Merge(CommonConfig, {
  devtool: 'inline-source-map',    
    // no hash names
  output: {
    path: path.resolve(__dirname, '../', '../', 'dist', 'client', 'static'),
    publicPath: '/static/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },
  plugins: [
    new WebpackShellPlugin({onBuildEnd: ['webpack --watch --config webpack/dev/webpack.server.dev.js']}),    
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: 'icons/[name].[ext]',
            }  
          }
        ]
      },
      {
        test: /(\.jsx?)$/,  
        exclude: /node_modules/,  
        use: [
          {
            loader: "babel-loader",  
            query: {  
                "presets": ["env", "react", "stage-0"],
            }
          }
        ]                
      },
    ]
  }
});
