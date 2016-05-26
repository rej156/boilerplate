var webpack = require('webpack')
var path = require('path')
var qs = require('querystring')

var webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'sourcemap',
  context: path.join(__dirname, '../'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server',
    './src/client/index.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist/'),
    publicPath: '/public/'
  },
  resolve: {
    modules: ['node_modules', 'src', 'vendor'],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    // preLoaders: [
    //   {
    //     test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'eslint-loader'
    //   }
    // ],
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
            "react-hot-loader/babel"
          ]
        }
      },
      {
        test: /\.css$/,
        // include: path.join(__dirname, '../src/client/'),
        loader: 'style!css?' + qs.stringify({
          modules: true,
          importLoaders: 1,
          localIdentName: '[path][name]-[local]'
        }) + '!postcss'
      }
    ]
  },
  postLoaders: [
    {
      exclude: /node_modules/,
      loader: "npm-install-loader",
      test: /\.js$/,
      query: {
        cli: {
          save: true
        }
      }
    },
  ],
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
