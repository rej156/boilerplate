import feathers from 'feathers'
import rest from 'feathers-rest'
import cors from 'cors'
import hooks from 'feathers-hooks'
import bodyParser from 'body-parser'
import socketio from 'feathers-socketio'
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
      app.use(`/${route}`, (typeof(service) === 'class') ? new service : service)
      if (fs.exists(beforeHooks)) app.service(route).before(require(beforeHooks).default)
      if (fs.exists(afterHooks)) app.service(route).after(require(afterHooks).default)
    }
  })
}

const app = feathers()

app
  .options('*', cors())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio({ wsEngine: 'uws' }))
  .configure(registerServices)

export default app
