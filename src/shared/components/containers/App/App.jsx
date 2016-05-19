import React, { Component } from 'react'
import { connect } from 'mobx-connect'
import styles from './App.css'
import DevTools from 'mobx-react-devtools'

@connect
export default class App extends Component {

  render() {
    return (
      <div className={styles.app}>
        {this.props.children}
        <DevTools />
      </div>
    )
  }
}
