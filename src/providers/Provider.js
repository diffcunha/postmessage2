export default class Provider {

  constructor () {
    this.onRequest = (message, context) => null
    this.onReply = (message, context) => null
    this.onError = (message, context) => null
  }

  send (message, context) {}

  onMessage (message, context) {
    const { type } = message

    if (type === 'request') {
      this.onRequest(message, context)
    } else if (type === 'reply') {
      this.onReply(message, context)
    } else if (type === 'error') {
      this.onError(message, context)
    } else {
      // TODO
    }
  }

  request (id, name, data) {
    const request = {
      id,
      name,
      data,
      type: 'request'
    }
    this.send(request)
  }

  reply (message, data, context) {
    const reply = {
      id: message.id,
      name: message.name,
      data: data,
      type: 'reply'
    }
    this.send(reply, context)
  }

  error (message, data, context) {
    const error = {
      id: message.id,
      name: message.name,
      data: data,
      type: 'error'
    }
    this.send(error, context)
  }

}
