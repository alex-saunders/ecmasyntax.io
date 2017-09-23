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
    path: path.resolve(__dirname, '../', '../', 'dist', 'client', 'static'),
    publicPath: '/static/',
    filename: 'js/[name].[chunkhash].bundle.js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js'
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
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: 'icons/[name].[hash].[ext]',
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
                "presets": ["env", "react", "stage-0"]
            }
          },
          // strip console logs in prod
          {
            loader: "webpack-strip?strip[]=console.log"
          }
        ]                
      },
    ]
  }
});
