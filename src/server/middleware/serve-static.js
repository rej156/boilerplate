import path from 'path'
import serveStatic from 'serve-static'

export default function() {
  this.use('/dist', serveStatic(path.join(__dirname, '../../../dist/')))
  this.use('/public', serveStatic(path.join(__dirname, '../../../public/')))
}
