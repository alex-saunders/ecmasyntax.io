const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const client = {
    name: 'client',
    target: 'web',
    entry: {
        app: ['babel-polyfill', './src/client/client.jsx'],
        vendor: ["react", "react-redux", "react-dom"],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new CleanWebpackPlugin([path.resolve(__dirname, '../', '../', 'dist', 'client', 'static', 'js')], {
        root: process.cwd()      
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      }),
      new ManifestPlugin({
        publicPath: '/static/js/'
      })
    ],
    
    module: {
        rules: [
            {
                test: /(\.jsx?)$/,  
                loader: "babel-loader",  
                exclude: /node_modules/,  
                query: {  
                    "presets": ["env", "react", "stage-0"]
                }
            },
            {
              test: /\.scss$/,
              use: [
                { loader: 'isomorphic-style-loader' },
                { loader: 'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]' },
                {
                  loader: "postcss-loader",
                  options: {
                      ident: 'postcss',
                      sourceMap: true,
                      plugins: () => { return [
                          require('postcss-cssnext')({
                            features: {
                              customProperties: false
                            }
                          }),
                      ]}
                  }
                },
                { 
                  loader: 'sass-loader',
                  options: { sourceMap: true }
                },
              ],
            },
            {
              test: /\.css$/,
              use: [
                { loader: 'isomorphic-style-loader' },
                { loader: 'css-loader' },
              ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
 };

 module.exports = client;