const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
  entry: './src/index', 
  resolve: {
    extensions: ['.ts', '.js'], 
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new DotenvWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['ts'],
      configType: 'eslintrc', // <--- ДОБАВЛЕНО: указывает плагину использовать классический .eslintrc
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode 
    ? require('./webpack.prod.config') 
    : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};