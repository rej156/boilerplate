'use strict'
require('css-modules-require-hook')({
  generateScopedName: '[path][name]-[local]'
});
require('babel-register')(require('./build/node-babel-config.json'));

var http = require('http');
require('./src/server/server.js').default;
