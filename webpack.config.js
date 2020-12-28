const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(`${__dirname}/build`),
    filename: 'bundle.[fullhash].js',
  },
  mode,
  devtool: mode === 'production' ? 'eval' : 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '/build'),
    historyApiFallback: true,
    index: 'index.html',
    port: 3000,
    hot: true,
    overlay: true,
    stats: 'errors-only',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_module/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      Src: path.resolve(__dirname, 'src'),
      Static: path.resolve(__dirname, 'static'),
    },
  },
  plugins: [
    mode === 'production'
      ? new webpack.optimize.OccurrenceOrderPlugin()
      : new webpack.HotModuleReplacementPlugin(),
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CleanWebpackPlugin(),
  ],
};
