import webpack from 'webpack'
import webpackConfig from '../../../build/webpack-config.js'
import path from 'path'
import chokidar from 'chokidar'

const compiler = webpack(webpackConfig)
const middleware = [
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/public/',
    path: '/dist/'
  }),
  require('webpack-hot-middleware')(compiler)
]

// Do "hot-reloading of API stuff on the server"
// Throw away the cached server modules and let them be re-required next time
const watcher = chokidar.watch(path.join(__dirname, '../../'));
watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /server/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (id.includes('/server/') || id.includes('/shared/')) {
        console.log(id)
        delete require.cache[id];
      }
    });
  });
});

// Do "hot-reloading" of react stuff on the server
// Throw away the cached client modules and let them be re-required next time
compiler.plugin('done', function() {
  console.log("Clearing /client/ module cache from server");
  Object.keys(require.cache).forEach(function(id) {
    if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
  });
});

export default middleware
