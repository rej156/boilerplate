import webpack from 'webpack'
import webpackConfig from '../../../build/webpack-config.js'
import webpackDevServer from 'webpack-dev-server'

const webpackDevMiddlewareConfig = {
  hot: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    chunks: false,
    colors: true,
    children: false
  },
  publicPath: '/public/'
}

const webpackDevServerConfig = {
  contentBase: path.join(__dirname, '../../'),
  hot: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  historyApiFallback: true,
  stats: {
    chunks: false,
    colors: true,
    children: false
  },
  watchOptions: {
    poll: true
  },
  publicPath: '/public/',
  proxy: {
    '**': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  },
  host: '0.0.0.0'
}

const server = new webpackDevServer(webpack(webpackConfig), webpackDevServerConfig);

server.listen(8080, function() {
  console.log(`Webpack dev server running at localhost:8080`)
})
