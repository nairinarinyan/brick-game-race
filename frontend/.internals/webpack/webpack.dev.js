/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const kojiProjectConfig = JSON.parse(require('../../../.koji/resources/scripts/buildConfig')());

module.exports = require('./webpack.base')({
  mode: 'development',
  entry: [
    'eventsource-polyfill', // Necessary for hot reloading with IE, but does anyone care about IE any more...??
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'src/index.ts'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(process.cwd(), 'index.html'),
      title: kojiProjectConfig.metadata.title,
      meta: {
          "title": kojiProjectConfig.metadata.title,
          "description": kojiProjectConfig.metadata.description,
          "og:title": kojiProjectConfig.metadata.title,
          "og:description": kojiProjectConfig.metadata.description,
          "og:image": kojiProjectConfig.metadata.image,
          "og:type": 'website',
      }
    }),

    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ],
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
});
