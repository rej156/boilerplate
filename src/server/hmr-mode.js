import feathers from 'feathers'
import compression from 'compression'
import serveStaticMiddleware from './middleware/serve-static'
import hmrMiddleware from './middleware/hmr'
import isomorphicMiddleware from './middleware/isomorphic'

const app = feathers();

app
  .use(compression())
  .set('view engine', 'ejs')
  .configure(serveStaticMiddleware)
  .use(hmrMiddleware)
//  .use(isomorphicMiddleware)
