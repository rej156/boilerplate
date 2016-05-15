import React, { Component } from 'react'
import { connect } from 'mobx-connect'
import styles from './App.css'
// dev tools
// import DevTools from 'mobx-react-devtools'

@connect
export default class App extends Component {

  render() {
    return (
      <div className={styles.app}>
        {this.props.children}
      </div>
    )
  }
}
