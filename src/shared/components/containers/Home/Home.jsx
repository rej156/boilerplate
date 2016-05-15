import React, { Component } from 'react'
import { connect } from 'mobx-connect'

@connect
export default class Home extends Component {
  static fetchData(store) {
  }
  render() {
    return (
      <div>
        <p>Home page</p>
      </div>
    )
  }
}
