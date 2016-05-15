var webpack = require('webpack')
var path = require('path')

var webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'sourcemap',
  context: path.join(__dirname, '..'),
  entry: {
    bundle: [
      '../src/client/index.jsx',
      'webpack-hot-middleware/client'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist/'),
    publicPath: path.join(__dirname, '../public/')
  },
  resolve: {
    modules: ['node_modules', 'src', 'vendor'],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
        query: {
          cacheDirectory: 'build-cache',
          presets: [
            "es2015-webpack",
            "stage-0",
            "react"
          ],
          plugins: [
            "transform-decorators-legacy"
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap!postcss',
        query: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[path][name]-[local]'
        }
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
      require('postcss-cssnext')({ browsers: ['last 2 versions'] }),
      require('postcss-bem-linter')(),
      require('postcss-reporter')()
    ]
  }
}

module.exports = webpackConfig
