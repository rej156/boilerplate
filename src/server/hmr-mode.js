import feathers from 'feathers'
import compression from 'compression'
import serveStaticMiddleware from './middleware/serve-static'
import hmrMiddleware from './middleware/hmr'
import isomorphicMiddleware from './middleware/isomorphic'
import { startWebServer as start } from './start.js'

const app = feathers();

app
  .use(compression())
  .set('view engine', 'ejs')
  .configure(serveStaticMiddleware)
  .use(hmrMiddleware)
  .use(isomorphicMiddleware)
  .configure(start)
