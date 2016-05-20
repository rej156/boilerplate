import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, match } from 'react-router'
import createStore from '../shared/lib/create-store.js'
import ContextProvider from '../shared/lib/context-provider.js'
import { fetchDataOnLocationMatch } from '../shared/lib/fetch-data.js'
import Root from './Root.jsx'
import routes from '../shared/routes.jsx'
import { AppContainer } from 'react-hot-loader'
import { observable, computed, autorun } from 'mobx'
const store = createStore(window.INITIAL_STATE)
fetchDataOnLocationMatch(browserHistory, routes, match, store)

function renderApp(Root, hmrStore) {
  if (window.store) {
    hmrStore = require('../shared/lib/create-store.js').default(JSON.parse(JSON.stringify(window.store)))
    window.store = hmrStore
  }
  render(
    <AppContainer>
      <Root store={hmrStore}/>
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp(Root, store)

if (module.hot) {
  if (!window.store) window.store = store
  module.hot.accept(() => {
    renderApp(require('./Root.jsx').default)
  })
}

