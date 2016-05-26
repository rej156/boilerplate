const path = require('path')
const fs = require('fs')

// Normalize \\ paths to / paths.
const makeUnixPath = (filepath) => process.platform === 'win32' ? filepath.replace(/\\/g, '/') : filepath

// Recursively traverse a directory, executing callback for each file.
module.exports = function traverseDir(rootdir, callback, pattern, subdir) {
  const abspath = subdir ? path.join(rootdir, subdir) : rootdir
  fs.readdirSync(abspath).forEach((filename) => {
    const filepath = path.join(abspath, filename)
    if (fs.statSync(filepath).isDirectory()) {
      traverseDir(rootdir, callback, pattern, makeUnixPath(path.join(subdir || '', filename || '')))
    } else {
      if (pattern && filename.match(pattern)) {
        callback(makeUnixPath(filepath), rootdir, subdir, filename)
      } else if (!pattern) {
        callback(makeUnixPath(filepath), rootdir, subdir, filename)
      }
    }
  })
}
