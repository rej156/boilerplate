import { observable, computed } from 'mobx'

export default class TickerStore {
  @observable timer = 0;

  constructor(ticker) {
    Object.assign(this, ticker);
  }

  @computed get timerMultiplied() { return this.timer * 2 }

  incrementTimer(count) {
    this.timer += count
  }

  resetTimer() {
    this.timer = 0;
  }
}
