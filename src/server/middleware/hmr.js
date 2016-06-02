import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../../build/webpack-config.js'
import feathers from 'feathers'
import path from 'path'
import proxy from 'http-proxy-middleware'

const webpackDevMiddlewareConfig = {
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
  historyApiFallback: false,
  publicPath: '/public/'
}
const compiler = webpack(webpackConfig)

const app = feathers()
      .use(webpackDevMiddleware(compiler, webpackDevMiddlewareConfig))
      .use(webpackHotMiddleware(compiler))
      .use('/*', proxy('http://localhost:3000'))
      .listen(8080, function() {
        console.log('Feathers webpack dev server running at localhost:8080')
      })
