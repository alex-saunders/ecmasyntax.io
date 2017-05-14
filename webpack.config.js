const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const autoprefixer = require('autoprefixer');

const clientPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
];
clientPlugins.push(
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }));

const clientConfig = {
  entry: './src/client.jsx',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, 'public', 'static'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react', 'stage-0'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          { loader: 'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  autoprefixer,
                ];
              },
            },
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
    ],
  },
  plugins: clientPlugins,
};

const serverConfig = {
  name: 'server',
  target: 'node',
  devtool: 'cheap-module-source-map',
  externals: [nodeExternals({
    whitelist: ['@material/switch/dist/mdc.switch.css'],
  })],
  entry: [
    './src/server.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'server.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react', 'stage-0'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          { loader: 'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  autoprefixer,
                ];
              },
            },
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
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
  },
};

process.traceDeprecation = false;

module.exports = [serverConfig, clientConfig];
