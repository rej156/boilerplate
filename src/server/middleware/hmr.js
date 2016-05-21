import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'
import webpackConfig from '../../../build/webpack-config.js'
import path from 'path'

const webpackDevServerConfig = {
  contentBase: path.join(__dirname, '../../'),
  hot: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    chunks: false,
    colors: true,
    children: false
  },
  watchOptions: {
    poll: true
  },
  historyApiFallback: false,
  publicPath: '/public/',
  proxy: {
    '*': 'http://localhost:' + (process.env.PORT || 3000)
  },
  host: 'localhost'
}

const server = new webpackDevServer(webpack(webpackConfig), webpackDevServerConfig);

server.listen(8080, function() {
  console.log('Webpack dev server running at localhost:8080')
})
