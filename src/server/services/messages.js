import feathers from 'feathers'
import rest from 'feathers-rest'

const app = feathers()

app
  .configure(rest())
  .use('/messages', {
    get(id, params) {
      return Promise.resolve({id, text: 'hello world'})
    }
  })

export default app
