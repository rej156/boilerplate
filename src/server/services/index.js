import feathers from 'feathers'
import rest from 'feathers-rest'
import traverseDir from '../../shared/lib/traverse-dir.js'
import R from 'ramda'

function registerServices() {
  const app = this
  traverseDir(__dirname, (filepath) => {
    if (filepath.includes('/service.js')) {
      const service = require(filepath).default
      const getRoute = R.compose(R.last, R.dropLast(1), R.split('/'))
      const route = getRoute(filepath)
      app.use(`/${route}`, new service)
    }
  })
}

const app = feathers()

app
  .configure(rest())
  .configure(registerServices)

export default app
