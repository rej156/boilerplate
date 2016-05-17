import React, { Component } from 'react'
import ContextProvider from '../shared/lib/context-provider.js'
import { Router, browserHistory } from 'react-router'
import routes from '../shared/routes.jsx'

export default class Root extends Component {
  render() {
    const store = this.props.store
    return(
      <ContextProvider store={{store}}>
        <Router routes={routes} key={Math.random()} history={browserHistory}/>
      </ContextProvider>
    )
  }
}
