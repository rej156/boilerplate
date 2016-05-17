import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, match } from 'react-router'
import createStore from '../shared/lib/create-store.js'
import ContextProvider from '../shared/lib/context-provider.js'
import { fetchDataOnLocationMatch } from '../shared/lib/fetch-data.js'
import Root from './Root.jsx'
import routes from '../shared/routes.jsx'

const store = createStore(window.INITIAL_STATE)
fetchDataOnLocationMatch(browserHistory, routes, match, store)

render(
  <Root store={{store}}/>,
  document.getElementById('root')
)
