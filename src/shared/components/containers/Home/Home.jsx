import React, { Component } from 'react'
import { connect } from 'mobx-connect'

@connect
export default class Home extends Component {
  static fetchData(store) {
  }

  render() {
    return (
      <div>
        <p onClick={() => this.context.store.ticker.incrementTimer(2)}>Increment timer via store setter function</p>
        <p onClick={() => this.context.store.ticker.timer += 3}>Increment by mutation ++</p>
        <p>Timer from observable: {this.context.store.ticker.timer}</p>
        <p>Timer from computed getter: {this.context.store.ticker.timerMultiplied}</p>
      </div>
    )
  }
}
