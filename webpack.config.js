const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const SvgStorePlugin require('webpack-svg-icon-system/lib/SvgStorePlugin');
 

module.exports = {
  entry: ['./app/javascripts/app.js'],
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'app.js'
  },
  // stats: {
  //   assets: true,
  //   colors: true,
  //   version: false,
  //   hash: true,
  //   timings: false,
  //   chunks: false,
  //   chunkModules: false
  // },

  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' }
    ])
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader']
      }
    ],
    loaders: [
      // { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, loader: "file" },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.svg$/, loader: 'svg-inline-loader' },

      // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      // { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      // { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: ['file-loader','url-loader'] },
      // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      // { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
  // {
  //     test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
  //     loader: 'url-loader?limit=10000',
  // },
// { test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/
// , loader: 'url?limit=100000&name=[name].[ext]'
// },

{ test: /\.svg$/,
      include: [/styles\/icons\/background-svgs\/svg/],
      loader: 'url-loader' },
{
  test: /\.svg$/,
  exclude: [/styles\/icons\/background-svgs\/svg/],
  loader: 'svg-inline'
},
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
