import AppStore from '../stores/app-store.js';

const inject = (state) => ({
  app: new AppStore(state.app)
})

export default function(state) {
  return (state) ? inject(state) : null
}

