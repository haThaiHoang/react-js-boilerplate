/* eslint-disable  */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const lodash = require('lodash')
const path = require('path')

function getAppConfig(env) {
  let data = require(`./src/configs/${env}`)
  const defaultData = require('./src/configs/default')

  data = lodash.assign(defaultData, data)

  return data
}

module.exports = (env) => {
  const NODE_ENV = (env && env.NODE_ENV) || 'development'
  const IS_DEV = NODE_ENV === 'development' || NODE_ENV === 'local'

  process.env.NODE_ENV = NODE_ENV

  console.log('Node ENV: %s', NODE_ENV)
  console.log('Configs: ', getAppConfig(NODE_ENV));

  return {
    devtool: IS_DEV ? 'source-map' : false,
    entry: path.resolve(__dirname, IS_DEV ? 'src/index.dev.js' : 'src'),
    output: {
      filename: '[name][hash].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: getAppConfig(NODE_ENV).PUBLIC_PATH
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(__dirname, "src/overwrite/antd-icons"),
        "@": path.resolve(__dirname, "src")
      }
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }, {
        test: /\.scss$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }, {
        test: /\.css$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: !IS_DEV,
            root: path.resolve(__dirname, 'src')
          }
        }]
      }, {
        test: /\.(jpg|jpeg|png|svg|woff|eot|ttf|otf|pdf)$/,
        use: ['file-loader']
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.ejs'),
        favicon: path.resolve(__dirname, 'src/resources/images/favicon.ico')
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'window._CONFIG': JSON.stringify(getAppConfig(NODE_ENV)),
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      host: '0.0.0.0',
      useLocalIp: true,
      disableHostCheck: true,
      hot: true,
      hotOnly: true,
      open: true,
      overlay: true,
      stats: 'minimal',
      clientLogLevel: 'warning',
      contentBase: path.join(__dirname, 'src'),
      historyApiFallback: true
    },
    stats: 'minimal',
    mode: IS_DEV ? 'development' : 'production'
  }
}
