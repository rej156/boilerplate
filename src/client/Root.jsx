import React, { Component } from 'react'
import ContextProvider from '../shared/lib/context-provider.js'
import { Router, browserHistory } from 'react-router'
import routes from '../shared/routes.jsx'
import { connect } from 'mobx-connect'

@connect
export default class Root extends Component {
  render() {
    const store = this.props.store
    return(
      <ContextProvider store={{store}}>
        <Router routes={routes} history={browserHistory}/>
      </ContextProvider>
    )
  }
}
