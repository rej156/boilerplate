import feathers from 'feathers'
import rest from 'feathers-rest'
import compression from 'compression'
import serveStaticMiddleware from './middleware/serve-static'
import hmrMiddleware from './middleware/hmr'

const app = feathers();

app
  .use(compression())
  .set('view engine', 'ejs')
  .configure(rest())
  .configure(serveStaticMiddleware)
  .use('/api', require('./services/messages.js').default())
  .use(hmrMiddleware)
  .use((req, res) => require('./middleware/isomorphic.js').default(req, res))

export default app
