import { observable } from 'mobx'
import client from '../lib/feathers-api-client.js'

export default class MessagesStore {

  @observable messages = []

  constructor(messages) {
    Object.assign(this, messages);
  }

  get service() { return client.service('api/messages') }

  createMessage(message) {
    this.service.create({ text: message })
      .then((message) => console.log(message)).catch(err => console.log(err))
  }

}
