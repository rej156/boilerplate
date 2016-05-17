'use strict'
require('css-modules-require-hook')({
  generateScopedName: '[path][name]-[local]'
});
require('babel-register')(require('./build/node-babel-config.json'));

var server = require('./src/server/server.js').default
server.listen(3000, function(err) {
  if (err) return console.log(err)
  console.log('Listening at http://%s:%d', 'localhost', '3000')
})
