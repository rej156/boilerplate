import React, { Component } from 'react'
import { connect } from 'mobx-connect'

@connect
export default class Home extends Component {
  static fetchData(store) {
  }

  render() {
    return (
      <div>
        <p onClick={() => this.context.store.ticker.incrementTimer(2)}>Increment function</p>
        <p onClick={() => this.context.store.ticker.timer++}>Increment by mutation ++</p>
        <p>{this.context.store.ticker.timer}</p>
        <p>{this.context.store.ticker.timerMultiplied}</p>
      </div>
    )
  }
}
