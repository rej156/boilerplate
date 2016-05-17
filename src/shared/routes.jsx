import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Components
import App from './components/containers/App/App.jsx'
// import NotFound from './containers/NotFound'
import Home from './components/containers/Home/Home.jsx'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/home" component={Home} />
    {/* <Route path="*" component={NotFound} status={404} /> */}
  </Route>
)
