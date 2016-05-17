// require('./src/server/server.api')
export default require((process.env.NODE_ENV === 'production') ? './isomorphic-mode.js' : './hmr-mode.js').default
