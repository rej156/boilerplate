import { observable, action, computed } from 'mobx'
import client from '../lib/feathers-api-client.js'

export default class MessagesStore {

  @observable messages = []
  @observable message = ''

  constructor(messages) {
    Object.assign(this, messages);
  }

  get service() { return client.service('api/messages') }

  @action addToMessages = (message) => {
    this.messages.push(message)
    this.message = ''
  }

  @action updateMessageText = (e) => this.message = e.target.value

  retrieveMessageByID = (id) => console.log(this.messages.filter((message) => message.id === id))

  @action createMessage = async (e) => {
    e.preventDefault()
    try { await this.service.create({ text: this.message }) }
    catch(e) { console.log(e) }
  }

}
