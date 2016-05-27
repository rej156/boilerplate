import AppStore from './app-store.js'
import TickerStore from './ticker-store.js'
import MessagesStore from './messages-store.js'
import { observable } from 'mobx'

export default (state) => ({
  app: new AppStore(state.app),
  ticker: new TickerStore(state.ticker),
  messages: new MessagesStore(state.messages)
})
