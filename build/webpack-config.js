var webpack = require('webpack')
var path = require('path')
var HappyPack = require('happypack')

var webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'eval-source-map',
  cache: true,
  context: path.join(__dirname, '../'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server',
    './src/client/index.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../public/'),
    publicPath: '/public/'
  },
  resolve: {
    modules: ['node_modules', 'src', 'vendors'],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HappyPack({ id: 'js', threads: 8 }),
    new HappyPack({ id: 'css', threads: 8 })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        // include: path.join(__dirname, '../src/client/'),
        query: {
          cacheDirectory: 'build-cache',
          presets: [
            "es2015",
            "stage-0",
            "react"
          ],
          plugins: [
            "transform-decorators-legacy",
            "transform-regenerator",
            "transform-runtime",
            "syntax-async-functions",
            "react-hot-loader/babel"
          ]
        },
        happy: { id: 'js' }
      },
      {
        test: /\.css$/,
        loader: 'style!css?{ modules: true, importLoaders: 1, localIdentName: "[path][name]" }!postcss',
        happy: { id: 'css' }
      }
    ]
  },
  postcss: function () {
    return [
      require('lost'),
      require('postcss-include')(),
      require('postcss-simple-vars'),
      require('postcss-url')(),
      require('postcss-cssnext')({ browsers: ['iOS >= 7', 'Android >= 4', 'Chrome >= 43'] }),
      require('postcss-bem-linter')(),
      require('postcss-reporter')()
    ]
  }
}

module.exports = webpackConfig
