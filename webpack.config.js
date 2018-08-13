const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const WORKING_DIRECTORY = process.cwd();
const SRC_DIRECTORY = path.resolve(WORKING_DIRECTORY, './src/');
const OUTPUT_DIRECTORY = path.resolve(WORKING_DIRECTORY, './build/');
const PUBLIC_PATH = ''; // Prefix of the resource url, the place the resource will be served
const IS_DEV = process.env.WP_MODE === 'dev';
const IS_PROD = process.env.WP_MODE === 'prod';

const config = () => ({
  mode: IS_DEV ? 'development' : 'production',

  entry: { index: path.join(SRC_DIRECTORY, './index.jsx') },

  output: {
    path: OUTPUT_DIRECTORY,
    filename: '[name].[hash].js',
    publicPath: PUBLIC_PATH,
  },

  resolve: {
    /* Resolve .jsx automatically */
    extensions: ['.js', '.jsx'],

    /* Define alias that can be directly used in import statement
       See https://webpack.js.org/configuration/resolve/#resolve-alias */
    alias: {
      src: SRC_DIRECTORY,
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            /* Preset ordering is from the last to the first */
            options: { presets: ['env', 'react', 'stage-0'] },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['env', 'flow', 'stage-0'] },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: [path.resolve(SRC_DIRECTORY)],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: path.join(OUTPUT_DIRECTORY, './images'),
              publicPath: PUBLIC_PATH,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: path.join(OUTPUT_DIRECTORY, './fonts'),
              publicPath: PUBLIC_PATH,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    /* Define some global variables that can be used in code */
    new webpack.DefinePlugin({
      IS_PROD: JSON.stringify(IS_PROD),
      IS_DEV: JSON.stringify(IS_DEV),
    }),

    /* Provide global modules like lodash */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    /* Clean before every build */
    new CleanWebpackPlugin([OUTPUT_DIRECTORY]),

    /* Create html page with template */
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(SRC_DIRECTORY, 'index.ejs'),
      minify: IS_PROD
        ? {
            removeAttributeQuotes: true,
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : false,
      hash: true,
    }),

    IS_DEV ? new webpack.HotModuleReplacementPlugin() : () => {},

    /* Copy if needed */
    // new CopyWebpackPlugin([]),
  ],

  devtool: IS_DEV ? 'inline-source-map' : false,

  devServer: IS_DEV
    ? {
        contentBase: OUTPUT_DIRECTORY,
        publicPath: '/', // The place files are served on devserver
        hot: true,
        port: 9999,
        open: false,
      }
    : {},

  optimization: IS_PROD
    ? {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
          chunks: 'all',
        },
      }
    : {},
});

module.exports = config();
