export default class MessageService {
  get(id, params) {
    return Promise.resolve({ id, what: '?' })
  }
}
