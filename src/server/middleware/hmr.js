import webpack from 'webpack'
import webpackConfig from '../../../build/webpack-config.js'
import chokidar from 'chokidar'
import path from 'path'

const compiler = webpack(webpackConfig)
const watcher = chokidar.watch('../');
const middleware = [
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: path.join(__dirname, '../../../public/'),
    historyApiFallback: true,
    hot: true,
    quiet: true,
    stats: {
      colors: true
    }
  }),
  require('webpack-hot-middleware')(compiler)
]

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /server/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
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
