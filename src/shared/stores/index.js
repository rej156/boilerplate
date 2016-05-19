import AppStore from './app-store.js';
import TickerStore from './ticker-store.js';
import { observable } from 'mobx'

export default (state) => ({
  app: new AppStore(state.app),
  ticker: new TickerStore(state.ticker)
})
