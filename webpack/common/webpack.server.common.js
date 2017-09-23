const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const server = {
    name: 'server',
    target: 'node',
    externals: [nodeExternals({
      whitelist: ['@material/switch/dist/mdc.switch.css'],
    })],
    entry: ['babel-polyfill', './src/server/server.js'],
    output: {
        path: path.resolve(__dirname, '../', '../', 'dist', 'server'),
        filename: 'server.js',
    },
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new CleanWebpackPlugin([path.resolve(__dirname, '../', '../', 'dist', 'server')], {
        root: process.cwd()      
      }),
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
                          require('postcss-cssnext'),
                      ]}
                  }
                },
                { loader: 'sass-loader' },
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

 module.exports = server;