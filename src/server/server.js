// require('./src/server/server.api')
require((process.env.NODE_ENV === 'production') ? './isomorphic-mode.js' : './hmr-mode.js')
