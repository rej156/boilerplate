'use strict'
require('css-modules-require-hook')({
  generateScopedName: '[path][name]-[local]'
});
require('babel-register')(require('./build/node-babel-config.json'));

var http = require('http');
var app = require('./src/server/server.js').default;
var server = http.createServer(app);

server.listen(3000, 'localhost', function(err) {
  if (err) throw err;
  var addr = server.address();
  console.log('Listening at http://%s:%d', addr.address, addr.port);
});
