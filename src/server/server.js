import feathers from 'feathers'

// require('./src/server/server.api')
require((process.env.NODE_ENV === 'production') ? './isomorphic-mode.js' : './hmr-mode.js')
const app = feathers()

export default app
