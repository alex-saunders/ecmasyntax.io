const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const autoprefixer = require('autoprefixer');

const autoprefix = autoprefixer({ flexbox: true });
const clientPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
  function () {
    this.plugin('done', (stats) => {
      fs.writeFileSync(
        path.join(__dirname, 'src', 'stats.json'),
        JSON.stringify(stats.toJson()));
    });
  },
  new CleanWebpackPlugin([path.join(__dirname, 'public', 'static', 'js')], {
    watch: true,
  }),
];

const clientConfig = {
  entry: './src/client.jsx',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'static'),
    publicPath: '/static/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
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
              presets: ['env', 'react', 'stage-0'],
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
                  autoprefix,
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
                  autoprefix,
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

module.exports = clientConfig;
