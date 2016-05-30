import React, { Component } from 'react'
import { connect } from 'mobx-connect'
import { action } from 'mobx'

@connect
export default class Home extends Component {
  static fetchData(store) {
  }

  componentDidMount() {
    this.context.store.messages.service.on('created', (message) =>
      this.context.store.messages.addToMessages(message))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.context.store.messages.createMessage}>
          <input
            value={this.context.store.messages.message}
            onChange={this.context.store.messages.updateMessageText} />
          <button type="submit">Send message</button>
        </form>
        <p onClick={() => this.context.store.ticker.resetTimer()}>Reset Timer</p>
        <p onClick={() => this.context.store.ticker.incrementTimer(2)}>Increment timer via store setter function</p>
        <p onClick={() => this.context.store.ticker.timer += 3}>Increment by mutation ++</p>
        <p>^^^ Actually you can't do this in mobx strict mode which is enabled.</p>
        <p>Timer from observable: {this.context.store.ticker.timer}</p>
        <p>Timer from computed getter: {this.context.store.ticker.timerMultiplied}</p>
        { this.context.store.messages.messages.map(({id, text}) => (<p key={id}>{text}</p>)) }
      </div>
    )
  }
}
