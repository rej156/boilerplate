import { observable, computed, action } from 'mobx'

export default class TickerStore {
  @observable timer = 0;

  constructor(ticker) {
    Object.assign(this, ticker);
  }

  @computed get timerMultiplied() { return this.timer * 3 }

  @action incrementTimer(count) {
    this.timer += count
  }

  @action resetTimer() { this.timer = 0 }

}
