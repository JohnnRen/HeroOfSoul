const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const WORKING_DIRECTORY = process.cwd();
const SRC_DIRECTORY = path.resolve(WORKING_DIRECTORY, './src/');
const OUTPUT_DIRECTORY = path.resolve(WORKING_DIRECTORY, './build/');
const PUBLIC_PATH = ''; // Prefix of the resource url, the place the resource will be served
const IS_DEV = process.env.WP_MODE === 'dev';
const IS_PROD = process.env.WP_MODE === 'prod';

const config = {
  entry: {
    index:path.join(SRC_DIRECTORY,'./indexDll.js'),
    
  },
};
