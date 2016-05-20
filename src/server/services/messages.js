import feathers from 'feathers'


class MessagesService {
  get(id, params) {
    return Promise.resolve({id, 'text': 'Whatever mate'})
  }
}

const Message = {
  get(id, params) {
    return Promise.resolve({id, 'text': 'yay'})
  }
}

const app = feathers().use('/messages', Message)

export default function() {
  return Message
}
