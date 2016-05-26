import feathers from 'feathers'
import rest from 'feathers-rest'
import traverseDir from '../../shared/lib/traverse-dir.js'
import R from 'ramda'
import fs from 'fs'
import path from 'path'

function registerServices() {
  const app = this
  traverseDir(__dirname, (filepath) => {
    if (filepath.includes('/service.js')) {
      const service = require(filepath).default
      const getServiceDir = R.compose(R.join('/'), R.dropLast(1), R.split('/'))
      const serviceDir = getServiceDir(filepath)
      const getRoute = R.compose(R.last(), R.split('/'), getServiceDir)
      const route = getRoute(filepath)
      const beforeHooks = path.join(serviceDir, '/before-hooks.js')
      const afterHooks = path.join(serviceDir, '/after-hooks.js')
      app.use(`/${route}`, new service)
      if (fs.exists(beforeHooks)) app.service(route).before(require(beforeHooks).default)
      if (fs.exists(afterHooks)) app.service(route).after(require(afterHooks).default)
    }
  })
}

const app = feathers()

app
  .configure(rest())
  .configure(registerServices)

export default app
