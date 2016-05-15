import path from 'path'
import routes from '../../shared/routes.jsx'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { fetchData } from '../../shared/lib/fetch-data.js'
import ContextProvider from '../../shared/lib/context-provider.js'
import createStore from '../../shared/lib/create-store.js'

function handleRouter(req, res, props) {
  const store = createStore({
    app: { ssrLocation: req.url }
  })
  const build = (process.env.NODE_ENV === 'production') ? '/public' : null
  const template = path.join(__dirname, '../template/index.ejs')

  fetchData(store, props.components, props.params, props.location.query)
    .then(() => renderToString(
      <ContextProvider context={{ store }}>
        <RouterContext {...props} />
      </ContextProvider>
    ))
    .then((html) => { console.log(html)})
    .then((html) => {
      res.status(200)
        .render(template, {
          app: html,
          build,
          state: JSON.stringify(store)
        })
    })
    .catch((err) => console.log(err))
}

function handleRedirect(res, redirect) {
  res.redirect(302, redirect.pathname + redirect.search)
}

function handleNotFound(res) {
  res.status(404).send('Not Found')
}

function handleError(res, err) {
  res.status(500).send(err.message)
}

export default function isomorphicMiddleware(req, res) {
  match({ routes, location: req.url },
    (err, redirect, props) => {
      if (err) handleError(res, err)
      else if (redirect) handleRedirect(res, redirect)
      else if (props) handleRouter(req, res, props)
      else handleNotFound(res)
    })
}
