import { observable, computed, autorun } from 'mobx'

export default class TickerStore {
  @observable timer = 0;

  constructor(ticker) {
    Object.assign(this, ticker);
  }

  @computed get timerMultiplied() { return this.timer * 1 }

  incrementTimer(count) {
    this.timer += (count * 2)
  }

  resetTimer() {
    this.timer = 0;
  }
}
