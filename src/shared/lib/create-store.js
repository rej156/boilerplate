import inject from '../stores/index.js'

export default function(state) {
  return state ? inject(state) : null
}

