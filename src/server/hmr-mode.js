import feathers from 'feathers'
import compression from 'compression'
import serveStaticMiddleware from './middleware/serve-static'
import hmrMiddleware from './middleware/hmr'

const app = feathers();

app
  .use(compression())
  .set('view engine', 'ejs')
  .configure(serveStaticMiddleware)
  .use(hmrMiddleware)
  .use((req, res) => require('./middleware/isomorphic.js').default(req, res))

export default app
