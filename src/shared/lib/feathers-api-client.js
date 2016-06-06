import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'
import hooks from 'feathers-hooks'

const socket = io('http://localhost:3000')

const app = feathers()
      .configure(hooks())
      .configure(socketio(socket))

socket.on('connect', () => console.log('yay connected!!'))

export default app
